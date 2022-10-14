interface PostType {
  post : {
    [key: string]: string;
  }
}

interface Posts {
      [key: string]: string;
  }

  interface Detail {
    fallback : {
      [slug: string] : {
        slug: string;
        frontmatter: {
          [key: string]: string;
        };
        content:string;
      }
    }
  
  }

interface Props{
  allPosts: Posts[];
}

interface ctx {
    params: {id:string, slug:string, category:string}
}


declare module 'markdown-it'
declare module 'remark'
declare module 'remark-html'
export {Props, Posts, ctx, PostType, Detail}