import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/description/Player";
import VideoDescription from "../components/description/VideoDescription";
import RelatedVideoList from "../components/list/RelatedVideoList";
import Loading from "../components/ui/Loading";
import { fetchVideo } from "../features/video/videoSlice";

export default function Video() {
    const { video, isLoading, isError, error } = useSelector((state) => state.video)
    const dispatch = useDispatch()
    const { videoId } = useParams()

    const { id, link, title, tags } = video || {};


    useEffect(() => {
        dispatch(fetchVideo(videoId))
    }, [dispatch, videoId])

    let content = null;
    if (isLoading) content = <Loading />

    if (!isLoading && isError) <div className="col-span-12">{error}</div>;

    if (!isLoading && !isError && !video?.id) {
        content = <div className="col-span-12">no Video Found!</div>;
    }

    if (!isLoading && !isError && video?.id) {
        content = <div class="grid grid-cols-3 gap-2 lg:gap-8">
            <div class="col-span-full w-full space-y-8 lg:col-span-2">
                <VideoPlayer link={link} title={title} />

                <VideoDescription video={video} />
            </div>

            <RelatedVideoList currentVideoId={id} tags={tags} />
        </div>
    }

    return (
        <section class="pt-6 pb-20">
            <div class="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                {content}
            </div>
        </section>
    );
}
