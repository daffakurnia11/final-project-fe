"use client";

import { Separator } from "@/components/ui/separator";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import usePrediction from "@/hooks/use-prediction";
import { energyApi } from "@/services/api/energy-api";

const formSchema = z.object({
  predicted_date: z.date(),
  sensor: z.string().min(1, "Sensor is required"),
});

export default function ManualPrediction() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { isPredicting } = usePrediction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      predicted_date: new Date(),
      sensor: "",
    },
  });

  function formatDate(date: Date) {
    return format(date, "yyyy-MM-dd");
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    toast({
      title: "Predicting..",
      description: "Please wait for prediction result",
    });
    const formattedDate = formatDate(values.predicted_date);
    energyApi
      .predict({ date: formattedDate, sensor: values.sensor })
      .then((res) => {
        if (!res.success) {
          toast({
            variant: "destructive",
            title: "Error",
            description: res.message,
          });
        } else {
          toast({
            title: res.message,
            description: "Prediction has been successfully made.",
          });
        }
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!isLoading && !isPredicting) {
      toast({
        title: "Prediction is ready",
        description: "You can now make a prediction.",
      });
    }
  }, [isPredicting, isLoading]);

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          Manual Prediction
        </h1>
        <Separator className="my-4" />
        <div className="w-full max-w-[400px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="predicted_date"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Prediction Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          disabled={isLoading || isPredicting}
                        >
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyyy-MM-dd")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription>Choose a date to predict.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sensor"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Sensor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading || isPredicting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a sensor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Sensors</SelectItem>
                        <SelectItem value="Sensor 1">Sensor 1</SelectItem>
                        <SelectItem value="Sensor 2">Sensor 2</SelectItem>
                        <SelectItem value="Sensor 3">Sensor 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a sensor to predict.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading || isPredicting}>
                Predict
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
