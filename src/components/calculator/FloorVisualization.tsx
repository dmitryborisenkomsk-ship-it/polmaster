import { useMemo } from 'react';

export interface FloorVisualizationProps {
  roomWidth: number;
  roomLength: number;
  boardWidth: number;
  boardLength: number;
  layoutType: 'straight' | 'offset';
}

interface Board {
  x: number;
  y: number;
  width: number;
  height: number;
  isPartial: boolean;
  row: number;
}

const FloorVisualization = ({
  roomWidth,
  roomLength,
  boardWidth,
  boardLength,
  layoutType,
}: FloorVisualizationProps) => {
  const boards = useMemo(() => {
    const result: Board[] = [];
    const offsetAmount = layoutType === 'offset' ? boardLength / 3 : 0;

    let y = 0;
    let row = 0;

    while (y < roomLength) {
      const currentBoardHeight = Math.min(boardWidth, roomLength - y);
      const rowOffset = layoutType === 'offset' ? (row % 3) * offsetAmount : 0;

      let x = -rowOffset;

      while (x < roomWidth) {
        const startX = Math.max(0, x);
        const endX = Math.min(roomWidth, x + boardLength);
        const currentBoardWidth = endX - startX;

        if (currentBoardWidth > 0) {
          result.push({
            x: startX,
            y,
            width: currentBoardWidth,
            height: currentBoardHeight,
            isPartial:
              currentBoardWidth < boardLength || currentBoardHeight < boardWidth,
            row,
          });
        }

        x += boardLength;
      }

      y += boardWidth;
      row++;
    }

    return result;
  }, [roomWidth, roomLength, boardWidth, boardLength, layoutType]);

  const maxViewSize = 500;
  const scale = Math.min(maxViewSize / roomWidth, maxViewSize / roomLength);
  const viewWidth = roomWidth * scale;
  const viewHeight = roomLength * scale;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="rounded-lg overflow-hidden border-4 border-border"
        style={{
          width: viewWidth,
          height: viewHeight,
        }}
      >
        <svg
          width={viewWidth}
          height={viewHeight}
          viewBox={`0 0 ${roomWidth} ${roomLength}`}
          className="block"
          aria-hidden
        >
          <defs>
            {boards.map((board, i) => {
              const patternId = `wood-${i}`;
              const seed = board.row * 100 + i;
              return (
                <pattern
                  key={patternId}
                  id={patternId}
                  patternUnits="userSpaceOnUse"
                  width={boardLength}
                  height={boardWidth}
                  x={board.x}
                  y={board.y}
                >
                  <rect
                    width={boardLength}
                    height={boardWidth}
                    fill={`hsl(${28 + (seed % 8)} ${42 + (seed % 10)}% ${58 + (seed % 12)}%)`}
                  />
                  {[...Array(5)].map((_, j) => (
                    <line
                      key={j}
                      x1={0}
                      y1={(boardWidth * (j + 1)) / 6}
                      x2={boardLength}
                      y2={(boardWidth * (j + 1)) / 6 + (seed % 3)}
                      stroke={`hsl(25 35% ${40 + (seed % 15)}%)`}
                      strokeWidth={0.3}
                      opacity={0.3}
                    />
                  ))}
                </pattern>
              );
            })}
          </defs>

          {boards.map((board, i) => (
            <g key={i}>
              <rect
                x={board.x}
                y={board.y}
                width={board.width}
                height={board.height}
                fill={`url(#wood-${i})`}
                stroke="hsl(25 50% 30%)"
                strokeWidth={0.5}
                rx={0.5}
              />
              {board.isPartial && (
                <rect
                  x={board.x}
                  y={board.y}
                  width={board.width}
                  height={board.height}
                  fill="hsl(0 70% 50%)"
                  opacity={0.15}
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/20 border border-primary/40" />
          <span>Целая доска</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive/20 border border-destructive/50" />
          <span>Обрезок</span>
        </div>
      </div>
    </div>
  );
};

export default FloorVisualization;
