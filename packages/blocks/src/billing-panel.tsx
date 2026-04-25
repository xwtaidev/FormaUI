import { Badge } from "./primitives/badge";
import { Button } from "./primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";

export function BillingPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Current plan</CardTitle>
            <CardDescription>Manage your subscription and billing contacts.</CardDescription>
          </div>
          <Badge>Pro</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-border p-3">
            <p className="text-xs text-muted-foreground">Seats</p>
            <p className="text-lg font-semibold text-foreground">12 / 20</p>
          </div>
          <div className="rounded-md border border-border p-3">
            <p className="text-xs text-muted-foreground">Renewal</p>
            <p className="text-lg font-semibold text-foreground">May 15, 2026</p>
          </div>
          <div className="rounded-md border border-border p-3">
            <p className="text-xs text-muted-foreground">Monthly total</p>
            <p className="text-lg font-semibold text-foreground">$79.00</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>Update payment method</Button>
          <Button variant="outline">Download invoices</Button>
        </div>
      </CardContent>
    </Card>
  );
}
