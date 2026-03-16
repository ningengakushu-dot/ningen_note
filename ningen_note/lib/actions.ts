"use server" //ファイル内の処理をサーバー側で実行させる
import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"

//（prismaリファレンス参照）

// 作成・更新用の型（基本設計書 5-3）
type PostInput = {
    title: string;
    slug: string;
    content: string;
    status: 'draft' | 'published';
    tags: string[];
    published_at?: Date | string | null;
};

// 記事を取得
export async function getAllPosts() {
    return (
        await prisma.post.findMany({
            orderBy: { published_at: "desc" },
        })
    )
}

// IDが一致する記事を1件取得
export async function getPostById(id: string) {
    return (
        await prisma.post.findUnique({
            where: { id: id },
        })
    )
}

// 新しいレコードの挿入（prismaにデータを書き込む）
export async function createPost(data: PostInput) {
    const postData = {
        ...data,
    };

    if (data.published_at) {
        postData.published_at = new Date(data.published_at);
    } else {
        postData.published_at = new Date();
    }

    return await prisma.post.create({
        data: postData
    })
}

// 記事を更新
export async function updatePost(id: string, data: PostInput) {
    return await prisma.post.update({
        where: { id: id },
        data: data
    })
}

// 記事を削除
export async function deletePost(id: string) {
    return await prisma.post.delete({
        where: { id: id }
    })
}


// 認証関連

// ログイン情報の取得
export async function login(email: string, password: string) {
    const supabase = await createClient()
    const result = await supabase.auth.signInWithPassword({ email, password })
    return(
        result
    )
}

// ログアウト
export async function logout(){
    const supabase = await createClient()
    return(
        supabase.auth.signOut()
    )
}