import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./primitives/card";
import { Input } from "./primitives/input";
import { Switch } from "./primitives/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./primitives/tabs";

export function SettingsLayout() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage profile, notifications, and access policies.</p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update organization display details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="workspace-name">
                  Workspace name
                </label>
                <Input id="workspace-name" defaultValue="FormaUI Labs" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose when your team gets alerted.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <p className="text-sm text-foreground">Send weekly usage digest</p>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Enforce stronger protections for your workspace.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <p className="text-sm text-foreground">Require SSO for all members</p>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
