"use client";

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
import { useGetPerformance } from "@/lib/queries/usePerformance";
import { performanceStatusLabels, performanceStatusStyles } from "@/constant/performance";
import { ReviewStatusEnum } from "@/types/performance.types";
import { useRole } from "@/lib/store/role.store";
import { check_role } from "@/lib/helper/check_role";
import { AddPerformanceDialog } from "@/components/dashboard/performance/add-performance-dialog";
import { CompleteReviewDialog } from "@/components/dashboard/performance/complete-review-dialog";
import { DeletePerformanceDialog } from "@/components/dashboard/performance/delete-performance-dialog";

export default function PerformancePage() {
  const roleStore = useRole();
  const checkRole = check_role(roleStore.role);
  const { data: reviews, isLoading } = useGetPerformance();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Performans</h1>
          <p className="mt-2 text-sm text-muted-foreground">Dövri performans qiymətləndirmələri.</p>
        </div>
        {checkRole && <AddPerformanceDialog />}
      </div>

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
                {checkRole && <TableHead className="text-right">Əməliyyat</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={checkRole ? 6 : 5} className="py-6 text-center text-muted-foreground">
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.employee}</TableCell>
                    <TableCell className="text-muted-foreground">{review.period}</TableCell>
                    <TableCell className="text-muted-foreground">{review.reviewer}</TableCell>
                    <TableCell>
                      {review.status === ReviewStatusEnum.COMPLETED ? (
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
                    {checkRole && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {review.status === ReviewStatusEnum.IN_PROGRESS && (
                            <CompleteReviewDialog review={review} />
                          )}
                          <DeletePerformanceDialog review={review} />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={checkRole ? 6 : 5} className="py-6 text-center text-muted-foreground">
                    Performans qiymətləndirməsi yoxdur.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
