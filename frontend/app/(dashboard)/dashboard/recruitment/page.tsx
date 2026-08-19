"use client";

import { useQuery } from "@tanstack/react-query";

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
import { fetchOpenPositions, stageLabels, stageStyles } from "@/lib/mock/recruitment";

export default function RecruitmentPage() {
  const { data: positions, isLoading } = useQuery({
    queryKey: ["open-positions"],
    queryFn: fetchOpenPositions,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">İşə qəbul</h1>
      <p className="mt-2 text-sm text-muted-foreground">Açıq vakansiyalar və namizədlərin vəziyyəti.</p>

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
                positions?.map((position) => (
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
                    <TableCell className="text-muted-foreground">{position.postedDate}</TableCell>
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
