import type { PageLoad } from "./$types"


export const load: PageLoad = async ({ params }) => {
    return {
        criterion: params.criterion
    }
}