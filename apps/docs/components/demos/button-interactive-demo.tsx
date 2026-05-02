"use client";

import { Button } from "@formaui/components";

export function ButtonInteractiveDemo() {
  return (
    <div className="w-full max-w-3xl space-y-4">
      <div className="grid grid-cols-5 gap-3">
        <Button variant="default" >Primary</Button>
        <Button variant="secondary" >Secondary</Button>
        <Button variant="outline" >Outline</Button>
        <Button variant="ghost" >Ghost</Button>
        <Button variant="destructive" >Destructive</Button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Button variant="outline" size="sm" >Small</Button>
        <Button variant="outline" size="md" >Medium</Button>
        <Button variant="outline" size="lg" >Large</Button>
        <Button variant="outline" size="icon"  aria-label="Icon button">
          +
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button disabled >Disabled</Button>
        <Button variant="outline" disabled >Disabled Outline</Button>
      </div>
    </div>
  );
}
