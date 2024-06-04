"use client";
import { useState, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  brand: z.string().min(1, "Vendor name must not be empty"),
  vendorName: z.string().min(1, "Vendor name must not be empty"),
  unitType: unitTypeEnum,
  numberUnits: z.coerce.number().min(0, "Units must be greater or equal to 0"),
  price: z.coerce.number().min(0, "Price must be greater or equal to 0"),
});

interface Ingredient {
  userID: string;
  ingredientName: string;
  brand: string;
  vendorName: string;
  unitType: string;
  numberUnits: number;
  price: number;
  pricePerUnit: number;
}
function CreateIngredientPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredientName: "",
      brand: "",
      vendorName: "",
      unitType: unitTypeEnum.Enum.g,
      numberUnits: 0,
      price: 0,
    },
  });
  const [ingredient, setIngredient] = useState<Ingredient>({
    userID: "",
    ingredientName: "",
    brand: "",
    vendorName: "",
    unitType: "",
    numberUnits: 0,
    price: 0,
    pricePerUnit: 0,
  });

  const [submitted, setSubmitted] = useState<Boolean>(false);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const pricePerUnit = values.price / values.numberUnits;

    const updatedIngredient = {
      ...ingredient,
      ingredientName: values.ingredientName,
      brand: values.brand,
      vendor: values.vendorName,
      unitType: values.unitType,
      numberUnits: values.numberUnits,
      price: values.price,
      pricePerUnit,
    };

    setIngredient(updatedIngredient);

    const token = localStorage.getItem("jwtToken");
    try {
      // need to update
      const response = await fetch("/api/ingredient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedIngredient),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      setSubmitted(true);
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  // access localStorage on client side
  useEffect(() => {
    const userID = localStorage.getItem("userID")?.toString() || "";
    setIngredient((prev) => ({ ...prev, userID }));
  }, []);

  return (
    <div className="min-h-screen w-full bg-[antiquewhite] grid place-items-center pt-10">
      {submitted ? (
        <div className="flex items-center justify-center mx-auto">
          <Alert className="text-center p-8 text-lg bg-[#283D3B]">
            <AlertTitle className="text-2xl mb-4 text-white">
              Ingredient Created
            </AlertTitle>
            <AlertDescription className="text-xl">
              <Link href="/createIngredient" onClick={() => setSubmitted(false)}>
                <Button className="text-md bg-[#9DB4AB]">Create another ingredient</Button>
              </Link>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
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
                    <FormLabel className="text-[2rem]">
                      Ingredient Name
                    </FormLabel>
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
              name="brand"
              render={({ field }) => {
                return (
                  <FormItem className="my-5">
                    <FormLabel className="text-[2rem]">Brand</FormLabel>
                    <FormControl>
                      <Input
                        className="text-[1.2rem] bg-[#FFFCF4]"
                        placeholder="Brand Name"
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
              name="numberUnits"
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
                                  <div className="border-[1.5px] border-gray-300 rounded-md p-1 cursor-pointer">
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
              name="price"
              render={({ field }) => {
                return (
                  <FormItem className="my-5 flex flex-col">
                    <FormLabel className="text-[2rem]">Price</FormLabel>
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
      )}
    </div>
  );
}

export default CreateIngredientPage;
