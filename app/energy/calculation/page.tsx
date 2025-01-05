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
import { Calendar as CalendarIcon, Check, Loader } from "lucide-react";
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
import useCalculation from "@/hooks/use-calculation";
import { energyApi } from "@/services/api/energy-api";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  date: z.date(),
  sensor: z.string().min(1, "Sensor is required"),
});

export default function ManualCalculation() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { isCalculating } = useCalculation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      sensor: "",
    },
  });

  function formatDate(date: Date) {
    return format(date, "yyyy-MM-dd");
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    toast({
      title: "Calculating..",
      description: "Please wait for calculation result",
    });
    const formattedDate = formatDate(values.date);
    energyApi
      .calculate({ date: formattedDate, sensor: values.sensor })
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
            description: "Calculation has been successfully made.",
          });
        }
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!isLoading && !isCalculating) {
      toast({
        title: "Calculation is ready",
        description: "You can now make a calculation.",
      });
    }
  }, [isCalculating, isLoading]);

  return (
    <>
      <div className="container">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
          Manual Calculation
        </h1>
        <Separator className="my-4" />
        <div className="w-full max-w-[400px]">
          <Card className="!w-full px-4 py-2 mb-3">
            <p className="text-sm flex gap-2">
              Calculation Status :{" "}
              {isCalculating ? (
                <span className="text-red-500 flex gap-1 items-center">
                  <Loader size={20} />
                  Calculating..
                </span>
              ) : (
                <span className="text-green-500 flex gap-1 items-center">
                  <Check size={20} />
                  Ready
                </span>
              )}
            </p>
          </Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Calculation Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          disabled={isLoading || isCalculating}
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
                    <FormDescription>
                      Choose a date to calculate the energy.
                    </FormDescription>
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
                      disabled={isLoading || isCalculating}
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
                      Choose a sensor to calculate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading || isCalculating}>
                Calculate
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
