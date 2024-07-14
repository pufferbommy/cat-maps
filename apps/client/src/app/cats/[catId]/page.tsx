import dayjs from "dayjs";
import Avatar from "boring-avatars";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { env } from "@/env";
import { Badge } from "@/components/ui/badge";
import CatCard from "@/components/cat/cat-card";
import CommentForm from "./_components/comment-form";
import { Separator } from "@/components/ui/separator";

async function getCat(catId: string) {
  const response = await fetch(`${env.SERVER_URL}/api/cats/${catId}`, {
    cache: "no-store",
  });
  const result: BaseResponse<CatDetail> = await response.json();
  return result.data!;
}

async function getComments(catId: string) {
  const response = await fetch(
    `${env.SERVER_URL}/api/comments?catId=${catId}`,
    {
      cache: "no-store",
    }
  );
  const result: BaseResponse<IComment[]> = await response.json();
  return result.data!;
}

const Cat = async ({ params }: { params: { catId: string } }) => {
  const catId = params.catId;

  if (!catId) {
    return <div className="py-4">Cat not found</div>;
  }

  const cat = await getCat(catId);
  const comments = await getComments(catId);

  if (!cat) {
    return <div className="py-4">Cat not found</div>;
  }

  const date = new Date(cat.createdAt);

  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  return (
    <div className="mt-4">
      <CatCard cat={cat} inCatPage />
      <p className="text-sm text-muted-foreground mt-2">
        Uploaded by <span className="capitalize">{cat.uploader.username}</span>{" "}
        on {formattedDate}
      </p>
      <div className="mt-4">
        <div className="flex mb-4 gap-2 justify-between items-center">
          <h2 className="font-bold text-lg">Comments</h2>
          <Badge variant="secondary">{comments.length}</Badge>
        </div>
        <CommentForm catId={catId} />
        <div className="flex flex-col gap-8 mt-8">
          {comments.length === 0 && (
            <div className="text-muted-foreground">No comments yet</div>
          )}
          {comments.map((comment, i) => (
            <div key={comment._id}>
              <div className="flex gap-4">
                <div>
                  <Avatar
                    variant="beam"
                    size={32}
                    name={comment.user.username}
                  />
                </div>
                <div className="w-[calc(100%-32px-16px)]">
                  <div className="flex gap-2 items-center justify-between">
                    <h3 className="capitalize font-bold truncate">
                      {comment.user.username}
                    </h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {dayjs(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              </div>
              {i !== comments.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cat;
