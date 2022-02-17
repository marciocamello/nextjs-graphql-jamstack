import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { PostDocument, usePostQuery } from "../../generated/graphql"
import { client, ssrCache } from "../../lib/urql"

export default function Post({ slug }) {

    // client side graphql query
    const [{ data: { post } }] = usePostQuery({
        variables: {
            slug
        }
    })

    return (
        <div>
            <Link href={`/blog`}>
                <a>
                    Back to home
                </a>
            </Link>
            <h1>{post.title}</h1>
            <img src={post.coverImage.url} style={{
                width: '100%'
            }} />
            <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

// server side render graphql query with cache
export const getStaticProps: GetStaticProps = async ({ params }) => {

    await client.query(PostDocument, {
        slug: params.slug
    }).toPromise();

    return {
        props: {
            urqlState: ssrCache.extractData(),
            slug: params.slug
        }
    }
}

