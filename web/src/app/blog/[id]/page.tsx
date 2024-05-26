import BlogDetail from "@/components/BlogDetail";
import { Metadata,ResolvingMetadata } from "next";

// export const metadata: Metadata = {
//     title: "Blog Detail",
//     description: "Blog Details",
//   };

  type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

  export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const id = params.id
   
    // fetch data
    const product = await fetch(`https://newsdata.io/api/1/latest?apikey=pub_4491623e0e71b39fc41baa53a851a9030488a&id=${id}`).then((res) => res.json())
   
    // optionally access and extend (rather than replace) parent metadata
    const data = product?.results?.[0]
    const previousImages = (await parent).openGraph?.images || []
   console.log("product",product)
    return {
      title: data.title,
      description:data.title,
      openGraph: {
        images: ['/some-specific-page-image.jpg', ...previousImages],
      },
    }
  }

export default function BlogDetails(){
return (
    <BlogDetail/>
)
}