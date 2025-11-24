import { CheckCircle, Clock } from "lucide-react";

interface TimelineItem {
  label: string;
  date?: string | null;
}

interface OrderTimelineProps {
  events: TimelineItem[];
}

export function OrderTimeline({ events }: OrderTimelineProps) {
  return (
    <div className="space-y-4 border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Riwayat Pesanan</h2>

      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-3">
            {event.date ? (
              <CheckCircle className="text-foreground w-5 h-5 mt-1" />
            ) : (
              <Clock className="text-gray-300 w-5 h-5 mt-1" />
            )}

            <div>
              <p className="font-medium text-xs">{event.label}</p>
              <p className="text-xs text-muted-foreground">
                {event.date ? new Date(event.date).toLocaleString() : "Belum"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
