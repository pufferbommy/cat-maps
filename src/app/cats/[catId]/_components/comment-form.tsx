"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createComment } from "@/services/comments";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment, commentSchema } from "@/schema/comment.schema";

interface CommentFormProps {
  catId: string;
}

const CommentForm = ({ catId }: CommentFormProps) => {
  const router = useRouter();

  const form = useForm<Comment>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      catId,
      text: "",
    },
  });

  async function onSubmit(values: Comment) {
    await createComment(values);
    form.reset();
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 bottom-4 sticky"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Write a comment..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Comment</Button>
      </form>
    </Form>
  );
};

export default CommentForm;
