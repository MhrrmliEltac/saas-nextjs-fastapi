"use client";

import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { fetchPerformanceReviews, performanceStatusLabels, performanceStatusStyles } from "@/lib/mock/performance";

export default function PerformancePage() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["performance-reviews"],
    queryFn: fetchPerformanceReviews,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Performans</h1>
      <p className="mt-2 text-sm text-muted-foreground">Dövri performans qiymətləndirmələri.</p>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İşçi</TableHead>
                <TableHead>Dövr</TableHead>
                <TableHead>Qiymətləndirən</TableHead>
                <TableHead>Bal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-6 text-center text-muted-foreground">
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : (
                reviews?.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.employee}</TableCell>
                    <TableCell className="text-muted-foreground">{review.period}</TableCell>
                    <TableCell className="text-muted-foreground">{review.reviewer}</TableCell>
                    <TableCell>
                      {review.status === "completed" ? (
                        <span className="flex items-center gap-1 font-medium">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          {review.score.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          performanceStatusStyles[review.status],
                        )}
                      >
                        {performanceStatusLabels[review.status]}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
