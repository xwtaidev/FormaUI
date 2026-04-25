import { Button } from "./primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";
import { Checkbox } from "./primitives/checkbox";
import { Input } from "./primitives/input";

export function LoginPanel() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to continue managing your workspace.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="email">
            Email
          </label>
          <Input id="email" placeholder="name@company.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="password">
            Password
          </label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <Button className="w-full">Sign in</Button>
      </CardContent>
    </Card>
  );
}
