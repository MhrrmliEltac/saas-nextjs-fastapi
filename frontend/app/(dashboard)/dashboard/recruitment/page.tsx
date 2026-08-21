"use client";

import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetPositions, useUpdatePositionStage } from "@/lib/queries/useRecruitment";
import { nextStage, stageLabels, stageStyles } from "@/constant/recruitment";
import { useRole } from "@/lib/store/role.store";
import { check_role } from "@/lib/helper/check_role";
import { AddPositionDialog } from "@/components/dashboard/recruitment/add-position-dialog";
import { DeletePositionDialog } from "@/components/dashboard/recruitment/delete-position-dialog";

export default function RecruitmentPage() {
  const roleStore = useRole();
  const checkRole = check_role(roleStore.role);
  const { data: positions, isLoading } = useGetPositions();
  const advanceStage = useUpdatePositionStage();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">İşə qəbul</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Açıq vakansiyalar və namizədlərin vəziyyəti.
          </p>
        </div>
        {checkRole && <AddPositionDialog />}
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vəzifə</TableHead>
                <TableHead>Departament</TableHead>
                <TableHead>Namizədlər</TableHead>
                <TableHead>Mərhələ</TableHead>
                <TableHead>Elan tarixi</TableHead>
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
              ) : positions && positions.length > 0 ? (
                positions.map((position) => {
                  const upcoming = nextStage[position.stage];
                  return (
                    <TableRow key={position.id}>
                      <TableCell className="font-medium">{position.title}</TableCell>
                      <TableCell className="text-muted-foreground">{position.department}</TableCell>
                      <TableCell className="text-muted-foreground">{position.candidates}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            stageStyles[position.stage],
                          )}
                        >
                          {stageLabels[position.stage]}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{position.posted_date}</TableCell>
                      {checkRole && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {upcoming && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={advanceStage.isPending}
                                onClick={() =>
                                  advanceStage.mutate({
                                    id: position.id,
                                    payload: { stage: upcoming },
                                  })
                                }
                              >
                                {stageLabels[upcoming]}
                                <ArrowRight className="size-3.5" />
                              </Button>
                            )}
                            <DeletePositionDialog position={position} />
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={checkRole ? 6 : 5} className="py-6 text-center text-muted-foreground">
                    Açıq vakansiya yoxdur.
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
