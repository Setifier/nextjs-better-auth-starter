import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { ReturnButton } from "@/components/return-button";
import { auth } from "@/lib/auth";
import Link from "next/dist/client/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UpdateUserForm } from "@/components/update-user-form";
import { ChangePasswordForm } from "@/components/change-password-form";

export default async function ProfilePage() {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/login");

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headerList,
    body: {
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />

        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      <div className="flex items-center gap-2">
        {session.user.role === "ADMIN" && (
          <Button size="sm" asChild>
            <Link href="/admin/dashboard">Admin Dashboard</Link>
          </Button>
        )}

        <SignOutButton />
      </div>

      <div className="text-2xl font-bold">Permissions</div>

      <div className="space-x-4">
        <Button size="sm">MANAGE OWN POSTS</Button>
        <Button size="sm" disabled={!FULL_POST_ACCESS.success}>
          MANAGE ALL POSTS
        </Button>
      </div>

      {session.user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={session.user.image}
          alt="User Image"
          className="size-24 border border-primary rounded-md object-cover"
        />
      ) : (
        <div className="size-24 border border-primary rounded-md bg-primary text-primary-foreground flex items-center justify-center">
          <span className="uppercase text-lg font-bold">
            {session.user.name.slice(0, 2)}
          </span>
        </div>
      )}

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>

      <div className="space-y-4 p-4 rounded-b-md border border-t-8 border-blue-400">
        <h2 className="text-2xl font-bold">Update Profile</h2>

        <UpdateUserForm
          name={session.user.name}
          image={session.user.image ?? ""}
        />
      </div>
      <div className="space-y-4 p-4 rounded-b-md border border-t-8 border-red-400">
        <h2 className="text-2xl font-bold">Change Password</h2>

        <ChangePasswordForm />
      </div>
    </div>
  );
}
