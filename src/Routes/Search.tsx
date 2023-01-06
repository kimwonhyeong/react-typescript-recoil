import {useLocation} from "react-router";
import {IGetbestGrade, IBestGradeResult, search} from "../api";
import {useQuery} from "react-query";
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {makeImagePath} from "../utils";
import DetailView from "../Components/DetailView";
import DetailTvView from "../Components/DetailTvView";
import {useHistory, useRouteMatch, useParams} from "react-router-dom";
import Header from "../Components/Header";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const ContentWrapper = styled.div`
	padding-left: 20px;
	width: 95%;
	display: flex;
	align-items: center;
	justify-content: start;
	flex-wrap: wrap;
	gap:20px;
	transform: translate(8%,0);
	margin-bottom: 60px;
	margin-top: 60px;
`;

const Content = styled.div<{bgPhoto:string}>`
	width: 300px;
	height: 450px;
	background-image: url(${({bgPhoto})=>bgPhoto});
	background-size: cover;
	
	cursor: pointer;
	font-weight: 300;
`;

const Overlay = styled(motion.div)`
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0);
	position: fixed;
	top:0;
`;

const DetailBox = styled(motion.div)`
	width: 95vw;
	height: 96vh;
	overflow:hidden;
	border-radius:15px;
	background-color: black;
	position: fixed;
	top: 2vh;
	left: 2.5vw;
`;

function Search() {
	const detailMovieHistory = useHistory();
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");
	const detailMatch = useRouteMatch<{media:string,movieId: string}>("/search/:media/:movieId");
	console.log(detailMatch);
	const {data:movieD, isLoading} = useQuery<IGetbestGrade>(["searchD",keyword], ()=>search("movie",keyword+""));
	const {data:movieTvD} = useQuery<IGetbestGrade>(["searchTvD",keyword], ()=>search("tv",keyword+""));
	const movieClick = (id:number) =>{
		console.log(id);
		detailMovieHistory.push(`/search/movie/${id}`);
		console.log(detailMatch);
	};
	const tvClick = (id:number) =>{
		console.log(id);
		detailMovieHistory.push(`/search/tv/${id}`);
		console.log(detailMatch);
	};
	console.log(detailMatch);
	const overlayClick = ()=>{
		detailMovieHistory.go(-1);
	};
	return (
		<Wrapper>
			{detailMatch?.isExact ? null : <Header/>}
			<h1 style={{marginLeft:"20px", marginTop: "100px", transform:"translate(0, -40%)", fontSize:"30px", fontWeight:"300"}}>영화</h1>
			<hr></hr>
			<ContentWrapper>
				{movieD?.results.map((item)=>
					<Content onClick={()=>movieClick(item.id)} bgPhoto={makeImagePath(item.poster_path)}></Content>
				)}
			</ContentWrapper>
			<h1 style={{marginLeft:"20px", marginTop: "100px", transform:"translate(0, -40%)", fontSize:"30px", fontWeight:"300"}}>TV</h1>
			<hr></hr>
			<ContentWrapper>
				{movieTvD?.results.map((item)=>
					<Content  onClick={()=>tvClick(item.id)} bgPhoto={makeImagePath(item.poster_path)}></Content>
				)}
			</ContentWrapper>
			<AnimatePresence>
				{detailMatch?.params.media === "movie" ? 
						<>
 							<Overlay onClick={overlayClick} animate={{background:"rgba(0,0,0,0.5)"}}/>
 							<DetailBox layoutId={`${detailMatch?.params.movieId}`}><DetailView id={detailMatch.params.movieId}/></DetailBox>
 						</>
				: null}
				
				{detailMatch?.params.media === "tv" ? 
						<>
 							<Overlay onClick={overlayClick} animate={{background:"rgba(0,0,0,0.5)"}}/>
 							<DetailBox layoutId={`${detailMatch?.params.movieId}`}><DetailTvView id={detailMatch.params.movieId}/></DetailBox>
 						</>
				: null}
			</AnimatePresence>
		</Wrapper>
	);
}

export default Search;

// <AnimatePresence>
// 				{detailMatch ? 
// 						<>
// 							<Overlay onClick={overlayClick} animate={{background:"rgba(0,0,0,0.5)"}}/>
// 							<DetailBox layoutId={`${detailMatch.params.movieId}`}><DetailView id={detailMatch.params.movieId}/></DetailBox>
// 						</>
// 				: null}
// 			</AnimatePresence>