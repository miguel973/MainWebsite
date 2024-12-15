import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar } from "lucide-react";

interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  topic: z.string().min(10, "Please provide more details about the meeting topic"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function Schedule() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
    },
  });

  const { data: slots, isLoading: slotsLoading } = useQuery({
    queryKey: ["slots", selectedDate],
    queryFn: async () => {
      if (!selectedDate) return [];
      const response = await fetch(`/api/slots?date=${selectedDate.toISOString()}`);
      if (!response.ok) throw new Error("Failed to fetch slots");
      return response.json() as Promise<TimeSlot[]>;
    },
    enabled: !!selectedDate,
  });

  const bookMutation = useMutation({
    mutationFn: async (data: BookingFormData & { slotId: number }) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to book meeting");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Meeting Booked!",
        description: "You'll receive a confirmation email shortly.",
      });
      form.reset();
      setSelectedSlot(null);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    if (!selectedSlot) return;
    bookMutation.mutate({ ...data, slotId: selectedSlot.id });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Schedule a Meeting
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
          <div className="flex justify-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              className="w-full"
              modifiersClassNames={{
                selected: "bg-primary text-primary-foreground",
                today: "bg-accent text-accent-foreground",
              }}
              styles={{
                root: { width: '100%' },
                months: { width: '100%' },
                month: { width: '100%' },
                caption: { width: '100%' },
                table: { width: '100%' },
              }}
            />
          </div>
        </Card>

        <div>
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
            {!selectedDate ? (
              <p className="text-muted-foreground text-center py-4">
                Please select a date to see available slots
              </p>
            ) : slotsLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : slots?.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No available slots for this date
              </p>
            ) : (
              <div className="space-y-2">
                {slots?.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(new Date(slot.startTime), "h:mm a")} - {format(new Date(slot.endTime), "h:mm a")}
                  </Button>
                ))}
              </div>
            )}
          </Card>

          {selectedSlot && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Book Meeting</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...form.register("name")}
                    placeholder="Your name"
                    className={form.formState.errors.name ? "border-red-500" : ""}
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="Your email"
                    className={form.formState.errors.email ? "border-red-500" : ""}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Textarea
                    {...form.register("topic")}
                    placeholder="What would you like to discuss?"
                    className={form.formState.errors.topic ? "border-red-500" : ""}
                  />
                  {form.formState.errors.topic && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.topic.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={bookMutation.isPending}
                  className="w-full"
                >
                  {bookMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Book Meeting"
                  )}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
