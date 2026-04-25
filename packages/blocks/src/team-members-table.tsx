"use client";

import type { DataTableColumn } from "./composites/data-table";
import { DataTable } from "./composites/data-table";
import { demoTeamMembers, type DemoTeamMember } from "./data/demo-data";
import { Badge } from "./primitives/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";

export interface TeamMembersTableProps {
  members?: DemoTeamMember[];
  title?: string;
  description?: string;
}

function statusVariant(status: DemoTeamMember["status"]) {
  if (status === "active") {
    return "default" as const;
  }
  if (status === "away") {
    return "secondary" as const;
  }
  return "outline" as const;
}

const memberColumns: DataTableColumn<DemoTeamMember>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true
  },
  {
    key: "role",
    header: "Role",
    sortable: true
  },
  {
    key: "team",
    header: "Team"
  },
  {
    key: "location",
    header: "Location"
  },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (value: unknown) => (
      <Badge variant={statusVariant(value as DemoTeamMember["status"])}>{String(value)}</Badge>
    )
  }
];

export function TeamMembersTable({
  members = demoTeamMembers,
  title = "Team members",
  description = "Directory of owners across product, engineering, and operations."
}: TeamMembersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={memberColumns} rows={members} />
      </CardContent>
    </Card>
  );
}
