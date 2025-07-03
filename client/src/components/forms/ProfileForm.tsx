"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileSchema } from "@/lib/validations/profileSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function ProfileForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/api/auth/user-info");
        const user = response.data.user;

        form.reset({
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          email: user.email ?? "",
          image: user.image ?? "https://randomuser.me/api/portraits/men/75.jpg",
        });
      } catch (error) {
        console.error("Failed to load user profile", error);
        toast.error("Could not load profile data");
      }
    };

    fetchProfile();
  }, [form]);

  const onSubmit = async (data: ProfileSchema) => {
    try {
      const response = await apiClient.patch("/api/user/update-profile", data);
      if (response.status === 200) {
        setUser(response.data.user);
        toast.success("Profile updated successfully!");
        router.push("/chat");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto"
      >
        <div className="text-center">
          <img
            src={form.watch("image")}
            alt="User"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
        </div>

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <Label>First Name</Label>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <Label>Last Name</Label>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  readOnly
                  className="bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <Label>Profile Image URL</Label>
              <FormControl>
                <Input
                  placeholder="https://example.com/avatar.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Profile
        </Button>
      </form>
    </Form>
  );
}
