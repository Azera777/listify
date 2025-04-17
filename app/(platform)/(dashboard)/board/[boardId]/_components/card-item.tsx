import { Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@/lib/generated/prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();
  const [showTooltip, setShowTooltip] = useState(false);

  const isOverdue = data.dueDate && new Date(data.dueDate) < new Date();
  const dueDateFormatted = data.dueDate
    ? new Date(data.dueDate).toLocaleString()
    : "";

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="relative truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm overflow-visible"
          onClick={() => cardModal.onOpen(data.id)}
        >
          <div className="flex items-center justify-between">
            <span className="truncate">{data.title}</span>

            {data.dueDate && (
              <div
                className="relative ml-2"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setShowTooltip(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
              >
                {isOverdue ? (
                  <AlertTriangle size={16} className="text-red-500 shrink-0" />
                ) : (
                  <Clock size={16} className="text-gray-500 shrink-0" />
                )}

                {showTooltip && (
                  <div className="absolute top-full mt-1 right-0 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                    {isOverdue
                      ? `Overdue: ${dueDateFormatted}`
                      : `Due: ${dueDateFormatted}`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
