import {IGetTv,getTv,popularTv,bestTvGrade} from "../api";
import {useQuery} from "react-query";
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useHistory, useRouteMatch, useParams} from "react-router-dom";
import DetailTvView from "../Components/DetailTvView";
import SliderTv from "../Components/SliderTv";
import {makeImagePath} from "../utils";
import {areaTv, videoTvKey} from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import {Play} from "../Components/DetailTvView";
import Header from "../Components/Header";

const Wrapper = styled.div`
	background: black;
	-webkit-user-select:none;
  	-moz-user-select:none;
 	-ms-user-select:none;
  	user-select:none;
`;

const Overlay = styled(motion.div)`
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0);
	position: fixed;
	top:0;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div<{bgPhoto: string}>`
	height: 100vh;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	
	background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,3)), url(${({bgPhoto})=>bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 50px;
	font-weight: 600;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	background: ${props=>props.theme.black.lighter}
	font-size: 100px;
	font-weight: 600;
	width: 38%;
`;

const SliderWrapper = styled(motion.div)`
	position: relative;
	top: -150px;
	width: 100%;
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

//offest = 6
// page = 0
//AnimatePresence tistory에 어제 배운 props 작성해라.
//|| ""를 해야 하게 했던 에러가 발생하는 경우가 숫자나 배열 중 일부를 뽑아올 때였다.

function Tv() {
	const detailTvHistory = useHistory();
	const detailMatch = useRouteMatch<{tvId: string}>("/tv/:tvId");
	const {data: tv, isLoading:tvLoading} = useQuery<IGetTv>("tvD",getTv);
	const {data: gradeTv, isLoading:gradeLoading} = useQuery<IGetTv>("gradeTvD", bestTvGrade);
	const {data: popular, isLoading:popularLoading} = useQuery<IGetTv>("popularTvD", popularTv);
	const [area, setArea] = useRecoilState(areaTv);
	const videoKeys = useRecoilValue(videoTvKey);
	console.log(detailMatch);
	//let i:number = 0;
	// const videoFunc = (i: number)=>{
	// 	const {data: video} = useQuery<IGetVideo>("videoD",getVideo(movie?.results[i].id) || "");	
	// }
	// for (i=0 ; i <movie?.results.length ; i++){
	// 	videoFunc(i);
	// }
	const overlayClick = ()=>{
		detailTvHistory.push("/tv");
	};
	const playMainMovie = ()=>{
		detailTvHistory.push(`/tv/${gradeTv?.results[6].id}`);
	};
	
	return (
		<>
			{detailMatch?.isExact ? null : <Header/>}
			<Wrapper>
				{tvLoading ? <Loader>Loading...</Loader> :
				<>
				 <Banner
					 bgPhoto={makeImagePath(gradeTv?.results[7].backdrop_path || "")}
				 >
					 <Title>{gradeTv?.results[7].name}</Title>
					 <Overview>{gradeTv?.results[7].overview}</Overview>
					 <Play onClick={playMainMovie}>자세히 보기</Play>
				 </Banner>
				 <SliderWrapper>
					 <Title style={{marginLeft:"20px"}}>상영 중</Title>
					 <SliderTv tv={tv?.results} id="movie"/>
					 <Title style={{marginLeft:"20px"}}>최고의 평가</Title>
					 <SliderTv tv={gradeTv?.results} id="gradeMovie" />
					 <Title style={{marginLeft:"20px"}}>인기있는 채널</Title>
					 <SliderTv tv={popular?.results} id="popularMovie"/>
				 </SliderWrapper>
				 <AnimatePresence>
					{detailMatch?.isExact ? 
						 <>
							<Overlay onClick={overlayClick} animate={{background:"rgba(0,0,0,0.5)"}}/>
							<DetailBox layoutId={`${detailMatch?.params.tvId}${area}`}><DetailTvView id={detailMatch.params.tvId}/></DetailBox> 
						 </>
					: null}
				 </AnimatePresence>
				</>
				}
			</Wrapper>
		</>
	)
};

export default Tv;