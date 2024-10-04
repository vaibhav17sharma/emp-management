"use client";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function CheckInCard({
  userId,
  userName,
  checkIn,
  checkOut,
}: {
  userId: string;
  userName: string;
  checkIn: Date | null;
  checkOut: Date | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  async function markCheckIn() {
    setIsLoading(true);
    const response = await axios.get(`/api/attendance/timeIn`);
    alert(JSON.stringify(response.data, null, 2));
    setIsLoading(false);
  }
  async function markCheckOut() {
    setIsLoading(true);
    const response = await axios.get(`/api/attendance/timeOut`);
    setIsLoading(false);
  }
  return (
    <>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Hello {userName}</CardTitle>
          <CardDescription className="text-balance max-w-lg leading-relaxed">
            Introducing Our Dynamic Orders Dashboard for Seamless Management and
            Insightful Analysis.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Today's Checkin</CardDescription>
          <CardTitle className="text-2xl">
            {checkIn ? formatDate(checkIn, "time") : "-"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {checkIn ? formatDate(checkIn, "date") : "-"}
          </div>
        </CardContent>
        <CardFooter>
          {checkIn == null && (
            <Button className="justify-center w-full" disabled={isLoading} onClick={() => markCheckIn()}>
              Check In
            </Button>
          )}
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Today's Checkout</CardDescription>
          <CardTitle className="text-2xl">
            {checkOut ? formatDate(checkOut, "time") : "-"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {checkOut ? formatDate(checkOut, "date") : "-"}
          </div>
        </CardContent>
        <CardFooter>
          {checkOut == null && checkIn != null && (
            <Button className="justify-center w-full" disabled={isLoading} onClick={() => markCheckOut()}>
              Check Out
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
