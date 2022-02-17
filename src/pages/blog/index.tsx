import { GetStaticProps } from "next";
import Link from "next/link";
import { PageDocument, PostsDocument, usePageQuery, usePostsQuery } from "../../generated/graphql";
import { client, ssrCache } from "../../lib/urql";

export default function Blog() {

    // client side graphql query
    const [{ data: { posts } }] = usePostsQuery();
    const [{ data: { page } }] = usePageQuery({
        variables: {
            slug: 'blog'
        }
    });

    return (
        <>
            <Link href={`/`}>
                <a>
                    Back to home
                </a>
            </Link>
            <h1>{page?.title}</h1>
            <h3>{page?.subtitle}</h3>
            <div style={{
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                justifyContent: 'space-between'
            }}>
                {posts?.map(post => (
                    <div key={post.slug} style={{
                        margin: 4,
                        flex: 1,
                        padding: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        textAlign: 'center',
                        backgroundColor: '#eee',
                    }}>
                        <img src={post.coverImage.url} style={{
                            width: '100%'
                        }} />
                        <h4>{post.title}</h4>
                        <p>{post.author.name}</p>
                        <Link href={`blog/${post.slug}`}>
                            <a>
                                Read more → {post.title}
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

// server side render graphql query with cache
export const getStaticProps: GetStaticProps = async () => {

    await Promise.all([
        await client.query(PostsDocument).toPromise(),
        await client.query(PageDocument, {
            slug: 'blog'
        }).toPromise()
    ]);

    return {
        props: {
            urqlState: ssrCache.extractData()
        }
    }
}