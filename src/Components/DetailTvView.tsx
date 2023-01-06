import styled from "styled-components";
import {useState, useEffect} from "react";
import {makeImagePath} from "../utils";
import {useHistory, useRouteMatch, useParams, useLocation} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {useQuery} from "react-query";
import {IGetTvRecommendResult,IgetTvDetail,IGetTvRecommend,getTvRecommend,getTvDetail,getTvVideo} from "../api";
import PlayMedia from "../Routes/Play";
import {videoTvKey} from "../atom";
import {useRecoilState} from "recoil";
import {Link} from "react-router-dom";

const Content = styled(motion.div)`
	width: 100%;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar{
		display: none;
	}
	z-index: 15;
`;

const Top = styled.div`
	width: 100%;
	height: 90%;
	background: black;
	
	position: relative;
`;

const PosterDiv = styled.div<{bgPhoto: string}>`
	width: 100%;
	height: 100%;
	background-image: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,3)), url(${({bgPhoto})=>bgPhoto});
	background-size: cover;
`;

const Info = styled.div`
	width: 50%;
	height: 70%;
	
	curser: default;
	position: absolute;
	top: 25%;
	left: 5%;
`;

const MovieTitle = styled.h1`
	font-weight: 900;
	font-size: 100px;
	cursor: default;
`;

const Item = styled.span`
	float: left;
	margin-top:15px;
	color: #bfff00;
	font-size: 17px;
	margin-right: 30px;
	cursor: default;
`;

const Play = styled.button`
	width: 300px;
	height:70px;
	curser: pointer;
	color: white;
	background: #00C5FF;
	font-size: 20px;
	margin-top: 20px;
	weight: 300;
	
	cursor: pointer;
	
	border: 0;
	outline: none;
	box-shadow: none;
`;

const Overview = styled.p`
	width: 95%;
	margin-top 20px;
	float: left;
`;

const Bottom = styled.div`
	width: 100%;
	background: black;
`;

const Clip = styled(motion.div)`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const Iframe = styled(motion.iframe)`

`;

const Recommend = styled.div`
	display: grid;
	gap: 1%;
	justify-content: center;
	grid-template-columns: 280px 280px 280px 280px 280px 280px;
	grid-template-rows: 400px 400px 400px 400px 400px 400px 400px 400px;
`;

const RecommendMovie = styled(motion.img)`
	width: 100%;
	height: 100%;
	background-size: cover;
	cursor: pointer;
`;

const BackSvg = styled(motion.svg)`
	width: 50px;
	height: 50px;
	position: absolute;
	top:25px;
	right: 25px;
	cursor: pointer;
	z-index: 20;
`;

const recommendVariant = {
	hover:{
		scale: 1.3,
		transition:{
			delay: 0.2,
			type:"tween",
		}
	}
}

interface IProps{
	id: string;
}

function DetailTvView({id}:IProps){
	const {data:detailTvD} = useQuery<IgetTvDetail>(["detailMovieTvD",id], ()=>getTvDetail(parseFloat(id)));
	const {data:recommendTvD} = useQuery<IGetTvRecommend>(["recommendTvD",id],()=>getTvRecommend(parseFloat(id)));
	
	const history = useHistory();

	const detailTvView = (movie:string,id:number)=>{
		history.push(`/tv/${id}`);
	}
	const recommendTvClick = (media:string, id:number) =>{
		detailTvView(media,id);
	}
	const { pathname } = useLocation();
	console.log(pathname);
  	useEffect(() => {
    	window.scrollTo(0, 0);
  	}, [pathname]);
	
	const backClick = ()=>{
		history.go(-1);
	};
	
	return (
		<Content>
			<Top>
				<BackSvg onClick={backClick} xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 384 512">
					<path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
				</BackSvg>
				<PosterDiv bgPhoto={makeImagePath(detailTvD?.backdrop_path || "")} />
				<Info>
					<MovieTitle>{detailTvD?.name}</MovieTitle>
					<Item>{`편당 방영시간: ${detailTvD?.episode_run_time}분`}</Item>
					<Item>{`출시일: ${detailTvD?.first_air_date}`}</Item>
					<Overview>{detailTvD?.overview}</Overview>
				</Info>
			</Top>
			<Bottom>
				<hr style={{width:"89%", float:"right"}}/>
				<h1 style={{transform:"translate(0, -40%)", fontSize:"40px", paddingLeft:"1%", fontWeight:"600"}}>추천 채널</h1>
				<Recommend>
					{recommendTvD?.results.slice(0,48)
						.map((item)=>
							<RecommendMovie 
								key={item.id}
								onClick={()=>recommendTvClick("movie",item.id)}
								variants={recommendVariant}
								whileHover="hover"
								src={makeImagePath(item.poster_path || "")}
							/>)}
				</Recommend>
			</Bottom>
		</Content>
	)
}

export default DetailTvView;
export {Play};
export {BackSvg};
//연관 영화 api 필요한 거 영화 id key
//리뷰 받기
//transform tranlate
//float란 어떤 의미인가
//div를 어떻게 정중앙 배치 할 수 있는가에 대한 이야기
//query-key에 대한 
//styled components를 export 하는 법
//https://itchallenger.tistory.com/626
//https://velog.io/@nanaheui000/%EC%BF%BC%EB%A6%ACQuery%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C-querykey
