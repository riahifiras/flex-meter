import React, { useRef, useEffect, useState } from 'react';

type Line = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};

const Board = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [lines, setLines] = useState<Line[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [endX, setEndX] = useState(0);
    const [endY, setEndY] = useState(0);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        const stickLine = (x1: number, y1: number, x2: number, y2: number) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const angle = Math.atan2(dy, dx);
            const snapAngle = 0.5 * Math.PI;
            const snapAngle2 = 1.5 * Math.PI;

            const deg = (angle * 180) / Math.PI;
            if (
                Math.abs(deg) < 10 ||
                Math.abs(deg - 180) < 10 ||
                Math.abs(deg - 90) < 10 ||
                Math.abs(deg - 270) < 10 ||
                Math.abs(deg + 90) < 10
            ) {
                const snapAngleRad = Math.round(deg / 90) * (Math.PI / 2);
                const snapX = Math.cos(snapAngleRad) * Math.sqrt(dx * dx + dy * dy) + x1;
                const snapY = Math.sin(snapAngleRad) * Math.sqrt(dx * dx + dy * dy) + y1;
                return { x: snapX, y: snapY };
            } else {
                return { x: x2, y: y2 };
            }
        };

        const startDrawing = (e: MouseEvent) => {
            setIsDrawing(true);
            setStartX(e.offsetX);
            setStartY(e.offsetY);
        };

        const draw = (e: MouseEvent) => {
            if (!isDrawing) return;
            if (!context) return;
            setEndX(e.offsetX);
            setEndY(e.offsetY);
            const { x, y } = stickLine(startX, startY, e.offsetX, e.offsetY);
            setEndX(x);
            setEndY(y);
            drawLines(context, lines);
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(x, y);
            context.strokeStyle = 'white';
            context.stroke();
        };

        const stopDrawing = () => {
            setIsDrawing(false);
            const { x, y } = stickLine(startX, startY, endX, endY);
            const newLines = [...lines];
            newLines.push({
                startX,
                startY,
                endX: x,
                endY: y,
            });
            setLines(newLines);
        };

        const drawLines = (ctx: CanvasRenderingContext2D, linesToDraw: Line[]) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            linesToDraw.forEach((line) => {
                ctx.beginPath();
                ctx.moveTo(line.startX, line.startY);
                ctx.lineTo(line.endX, line.endY);
                ctx.strokeStyle = 'white';
                ctx.stroke();
            });
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
        };
    }, [isDrawing, startX, startY, endX, endY, lines]);

    return (
        <div className='flex justify-center items-center h-screen'>
            <canvas
                ref={canvasRef}
                width={400}
                height={360}
                className='border-2 cursor-crosshair'
            ></canvas>
        </div>
    );
};

export default Board;
