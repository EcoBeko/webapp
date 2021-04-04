import { AuthorType, PostType } from "@/@types";
import { api } from "@/core/services/api.service";

export class PostsService {
  public static async createPost(
    content: any,
    postType: PostType,
    authorType: AuthorType,
    authorId: string,
    attachments: string[],
  ) {
    const { data } = await api.post("posts", {
      content,
      postType,
      authorType,
      authorId,
      attachments,
    });

    return data;
  }

  public static async fetchPosts(userId: string) {
    const { data } = await api.get("posts/" + userId + "/feed");

    return data;
  }

  public static async setLike(postId: string, userId: string) {
    const { data } = await api.put("posts/" + postId + "/likes", {
      userId,
    });

    return data;
  }
}
