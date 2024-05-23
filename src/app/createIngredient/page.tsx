"use client";
import React, { useState, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const unitTypeEnum = z.enum(["kg", "lb", "oz", "g"]);

const formSchema = z.object({
  ingredientName: z.string().min(1, "Ingredient name must not be empty"),
  vendorName: z.string().min(1, "Vendor name must not be empty"),
  units: z.coerce.number().min(0, "Units must be greater or equal to 0"),
  totalPrice: z.coerce
    .number()
    .min(0, "Total price must be greater or equal to 0"),
  unitType: unitTypeEnum,
});

interface Ingredient {
  ingredientName: string;
  vendorName: string;
  units: number;
  totalPrice: number;
  unitType: string;
}
function createIngredientPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredientName: "",
      vendorName: "",
      units: 0,
      totalPrice: 0,
      unitType: "",
    },
  });
  const [ingredient, setIngredient] = useState<Ingredient>({
    ingredientName: "",
    vendorName: "",
    units: 0,
    totalPrice: 0,
    unitType: "",
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIngredient((ingredientFields) => ({
      ...ingredientFields,
      ingredientName: values.ingredientName,
      vendorName: values.vendorName,
      units: values.units,
      totalPrice: values.totalPrice,
      unitType: values.unitType,
    }));

    try {
      // need to update
      const response = await fetch("/api/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredient),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  useEffect(() => {
    console.log("Updated ingredients:", ingredient);
  }, [ingredient]);

  return (
    <div className="min-h-screen w-full bg-[antiquewhite] grid place-items-center pt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col mx-auto mt-5 sm:min-w-lg md:min-w-lg lg:min-w-[50rem] xl:min-w-[70rem] bg-[#9DB4AB] min-h-[50rem] px-10 pb-5 border rounded-[10px] border-black"
        >
          <FormField
            control={form.control}
            name="ingredientName"
            render={({ field }) => {
              return (
                <FormItem className="my-5">
                  <FormLabel className="text-[2rem]">Ingredient Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[1.2rem] bg-[#FFFCF4]"
                      placeholder="Ingredient Name"
                      type="string"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="vendorName"
            render={({ field }) => {
              return (
                <FormItem className="my-5">
                  <FormLabel className="text-[2rem]">Vendor Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-[1.2rem] bg-[#FFFCF4]"
                      placeholder="Vendor Name"
                      type="string"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="units"
            render={({ field }) => (
              <FormItem className="my-5 flex flex-col">
                <FormLabel className="text-[2rem]">Units</FormLabel>
                <FormControl>
                  <OutlinedInput
                    className="text-[1.2rem] bg-[#FFFCF4]"
                    endAdornment={
                      <InputAdornment position="start">
                        <Controller
                          name="unitType"
                          control={form.control}
                          render={({ field }) => (
                            <DropdownMenu>
                              <DropdownMenuTrigger className="w-[10rem]">
                                <div className="border-[1.5px] border-gray-300 rounded-md p-1">
                                  {field.value || "Select Unit Type"}
                                </div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-white">
                                {unitTypeEnum.options.map((unit) => (
                                  <DropdownMenuItem
                                    key={unit}
                                    className="text-[1.2rem]"
                                    onSelect={() => field.onChange(unit)}
                                  >
                                    {unit}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        />
                      </InputAdornment>
                    }
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalPrice"
            render={({ field }) => {
              return (
                <FormItem className="my-5 flex flex-col">
                  <FormLabel className="text-[2rem]">Total Price</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Units" type="number" {...field} /> */}
                    <OutlinedInput
                      className="text-[1.2rem] bg-[#FFFCF4]"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      type="number"
                      {...field}
                    />
                    {/* Will need to be a dropdown selection or something to select unit type */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="w-full flex justify-center mt-5">
            <Button
              type="submit"
              className="rounded-[20px] mx-auto text-xl px-5 h-20 w-80"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default createIngredientPage;
