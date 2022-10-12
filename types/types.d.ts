interface Posts {
    slug: string;
    frontmatter: {
      [key: string]: string;
    };
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
posts: Posts[];
}

interface ctx {
    params: {id:string, slug:string}
}

interface post {
    frontmatter : {
        date:string,
        description:string,
        featured:number,
        image:string,
        title:string
    }, slug:string, content?:object[];
}

interface postList {
    posts:[]
  }
declare module 'markdown-it'

export {Props, Posts, ctx, post, postList, Detail}