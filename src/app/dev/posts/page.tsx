import { AppMain, HeadingOne } from '@/components/global';
import supabase from '@/lib/supabase/client';
import Link from 'next/link';
import { z } from 'zod';
import { siteURL } from '@/lib/iso';
import { redirect } from 'next/navigation';

const booleanParam = z.preprocess((arg, ctx) => {
    if (arg === 'true') return true;
    if (arg === 'false') return false;
    return arg;
}, z.boolean().optional());

const paramValidator = z.object({
    page: z.coerce.number().optional(),
    id: booleanParam,
    name: booleanParam,
    created_at: booleanParam,
    updated_at: booleanParam,
});

export default async function ListPosts({
    searchParams,
}: {
    searchParams: Promise<Record<string, unknown>>;
}) {
    const parsed = paramValidator.safeParse(await searchParams);
    if (!parsed.success) redirect(siteURL('/dev/posts').toString());
    const params = parsed.data;
    const page = params.page ?? 0;
    const query = supabase
        .from('posts')
        .select('id,name,created_at,updated_at')
        .range(page * 25, (page + 1) * 25)
        .order('id', { ascending: params.id ?? false });
    if (params.created_at !== undefined)
        query.order('created_at', { ascending: params.id });
    if (params.name !== undefined)
        query.order('name', { ascending: params.name });
    if (params.updated_at !== undefined)
        query.order('updated_at', { ascending: params.updated_at });
    const response = await query;
    if (response.error)
        return (
            <AppMain>
                <HeadingOne>No posts found</HeadingOne>
                <ul>
                    {Object.entries(response.error).map(([key, value]) => (
                        <li key={key}>
                            <span>{value}</span>
                        </li>
                    ))}
                </ul>
            </AppMain>
        );
    const { data } = response;
    const cycleParamInURL = (arg: keyof z.infer<typeof paramValidator>) => {
        const url = siteURL('/dev/posts');
        if (params[arg] === undefined) {
            for (const [key, value] of Object.entries(params)) {
                url.searchParams.append(key, String(value));
            }
            url.searchParams.append(arg, 'true');
            return url.toString();
        }
        if (params[arg] === true) {
            for (const [key, value] of Object.entries(params)) {
                if (key === arg) {
                    url.searchParams.append(arg, 'false');
                    continue;
                }
                url.searchParams.append(key, String(value));
            }
            return url.toString();
        }
        for (const [key, value] of Object.entries(params)) {
            if (key === arg) continue;
            url.searchParams.append(key, String(value));
        }
        return url.toString();
    };
    return (
        <AppMain>
            <HeadingOne>Available Posts</HeadingOne>
            <table>
                <thead>
                    <tr>
                        <td>
                            <Link href={cycleParamInURL('id')}>
                                ID{' '}
                                {params.id === undefined ? (
                                    <span>-</span>
                                ) : params.id === true ? (
                                    <span>&uarr;</span>
                                ) : (
                                    <span>&darr;</span>
                                )}
                            </Link>
                        </td>
                        <td>
                            <Link href={cycleParamInURL('name')}>
                                Name{' '}
                                {params.name === undefined ? (
                                    <span>-</span>
                                ) : params.name === true ? (
                                    <span>&uarr;</span>
                                ) : (
                                    <span>&darr;</span>
                                )}
                            </Link>
                        </td>
                        <td>
                            <Link href={cycleParamInURL('created_at')}>
                                Created At{' '}
                                {params.created_at === undefined ? (
                                    <span>-</span>
                                ) : params.created_at === true ? (
                                    <span>&uarr;</span>
                                ) : (
                                    <span>&darr;</span>
                                )}
                            </Link>
                        </td>
                        <td>
                            <Link href={cycleParamInURL('updated_at')}>
                                Updated At{' '}
                                {params.updated_at === undefined ? (
                                    <span>-</span>
                                ) : params.updated_at === true ? (
                                    <span>&uarr;</span>
                                ) : (
                                    <span>&darr;</span>
                                )}
                            </Link>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={4}>No posts found.</td>
                        </tr>
                    ) : (
                        data.map(({ id, name, created_at, updated_at }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{created_at}</td>
                                <td>{updated_at}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </AppMain>
    );
}
