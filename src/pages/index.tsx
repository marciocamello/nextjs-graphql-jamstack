import { GetServerSideProps } from "next"
import Link from "next/link"
import Hero from "../components/Hero"
import { usePageQuery, PageDocument } from "../generated/graphql"
import { client, ssrCache } from "../lib/urql"

export default function Home() {

    // client side graphql query
    const [{ data }] = usePageQuery({
        variables: {
            slug: 'home'
        }
    })

    return (
        <>
            <Hero
                title={data?.page?.title}
                subtitle={data?.page?.subtitle}
                content={data?.page?.content?.text}
            />
            <Link href={`/blog`}>
                <a>
                    Blog
                </a>
            </Link>
        </>
    )
}

// server side render graphql query with cache
export const getServerSideProps: GetServerSideProps = async () => {
    await client.query(PageDocument, { slug: 'home' }).toPromise();

    return {
        props: {
            urqlState: ssrCache.extractData()
        }
    }
}