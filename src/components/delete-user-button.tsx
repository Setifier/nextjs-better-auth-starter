"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { deleteUserAction } from "@/actions/delete-user.action";
import { toast } from "sonner";

interface DeleteUserButtonProps {
  userId: string;
}

export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);
    const { error } = await deleteUserAction({ userId });
    if (error) {
      toast.error(error);
    } else {
      toast.success("User deleted successfully");
    }

    setIsPending(false);
  }

  return (
    <Button
      size="sm"
      variant="destructive"
      className="size-7 rounded-sm"
      disabled={isPending}
      onClick={handleClick}
    >
      <span className="sr-only text-red-500">DELETE</span>
      <TrashIcon className="size-4" />
    </Button>
  );
}

export const PlaceholderDeleteUserButton = () => {
  return (
    <Button
      size="sm"
      variant="destructive"
      className="size-7 rounded-sm"
      disabled
    >
      <span className="sr-only text-red-500">DELETE</span>
      <TrashIcon className="size-4" />
    </Button>
  );
};
