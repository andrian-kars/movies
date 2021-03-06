import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, onGetRatedMovies } from '../../redux/trendsReducer'
import { AppStateType } from '../../redux/store'
import s from './Trends.module.scss'
import { Movie } from './../Common/Movie/Movie'
import { MovieType } from '../../types'
import { Paginator } from './../Common/Paginator/Paginator'
import { Preloader } from './../Common/Preloader/Preloader'

export const Trends: React.FC = memo(() => {
    const ratedMovies = useSelector((state: AppStateType) => state.trends.ratedMovies)
    const currentPage = useSelector((state: AppStateType) => state.trends.currentPage)
    const totalPages = useSelector((state: AppStateType) => state.trends.totalPages)
    // Loaders
    const isFetching = useSelector((state: AppStateType) => state.trends.isFetching)
    const isFetchingPage = useSelector((state: AppStateType) => state.trends.isFetchingPage)

    const dispatch = useDispatch()

    useEffect(() => {
        const getRatedMovies = (page: number) => { dispatch(onGetRatedMovies(page)) }
        getRatedMovies(currentPage)
    }, [dispatch, currentPage])

    const onPageChange = (page: number) => dispatch(actions.setCurrentPage(page))

    return <div className={s.trends}>
        {isFetching ? <Preloader />
            :<>
                <div className={s.head}>
                    <span className={s.heading}>Trends</span>
                    <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                </div>
                {isFetchingPage ? <Preloader />
                    : <>
                        <div className={s.movies}>
                            {ratedMovies.map((m: MovieType) =>
                                <Movie genresID={m.genre_ids} release={m.release_date} key={m.id} id={m.id} title={m.title} poster={`https://image.tmdb.org/t/p/w500${m.poster_path}`} rating={m.vote_average} />
                            )}
                        </div>
                        <div className={s.head}>
                            <span className={s.heading}>Trends</span>
                            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                        </div>
                    </>}
            </>}
    </div>
})