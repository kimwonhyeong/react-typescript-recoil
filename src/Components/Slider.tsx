import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useHistory, useRouteMatch, useParams} from "react-router-dom";
import {useState} from "react";
import {makeImagePath} from "../utils";
import {IMovie} from "../api";
import PropTypes from "prop-types";
import {areaMovie} from "../atom";
import { useRecoilState } from "recoil";

const SliderWrapper = styled(motion.div)`
	position: relative;
	width: 100%;
	height: 500px;
`;

const Row = styled(motion.div)`
	 width: 92%;
	 height: 500px;
	 display: grid;
	 grid-template-columns: repeat(6,1fr);
	 gap: 12px;
	 position: absolute;
	 left: 4%;
`;

const Box = styled(motion.div)<{bgPhoto: string}>`
	cursor: pointer;
	border-radius: 10px;
	height: 45vh;
	background-image: url(${({bgPhoto})=>bgPhoto});
	background-size: cover;
	background-position: center center;
	&:first-child{
	    transform-origin: center left;
	}
	&:last-child{
	    transform-origin: center right;
	}
`;

const ArrowDiv = styled.div`
	width: 4%;
	height: 500px;
	&:first-child{
		float: left;
	}
	&:last-child{
		float: right;
	}
	text-align: center;
`;

const Arrow = styled.svg`
	width: 30px;
	height:30px;
`;

const Info = styled(motion.div)`
	position: absolute;
	bottom: 0px;
	height: 30px;
	width: 100%;
	padding: 5px;
	background: black;
	opacity: 0;
	
	h4{
		font-size: 18px;
		text-align: center;
	}
`;

const boxVariant = {
	normal: {
		scale:1
	},
	hover: {
		scale:1.3,
		y:-50,
		transition: {
			delay:0.2,
			type:"tween"
		}
	},
}

const infoVariant = {
	hover: {
		opacity:1,
		transition: {
			delay:0.2,
			type:"tween"
		}
	}
}

const rowVars = {
	entry: (leftRight:boolean)=>({
		x: leftRight ?  window.outerWidth + 10 : -window.outerWidth - 10,
	}),
	center: {
		x: 0,
	},
	exit: (leftRight: boolean)=>({
		x: leftRight ? -window.outerWidth - 10 :  window.outerWidth + 10,
	}),
}

const offset = 6;

type sliderProps = {
  movie?: IMovie[];
  id?: string;
};

function Slider({movie,id}:sliderProps){
	const [area, setArea] = useRecoilState(areaMovie);
	const areaClassification = ()=>{
		setArea(id+"");
	}
	const detailMovieHistory = useHistory();
	const detailMovieView = (channel:string,movieId:number)=>{
		detailMovieHistory.push(`/${channel}/${movieId}`);
	};
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const [leftRight, setLeftRight] = useState(false);
	const increaseIndex = () => {
			if(leaving) return;
			toggleLeaving();
			setLeftRight(true);
			const totalMovies = movie!.length-1;
			const maxIndex = Math.ceil(totalMovies/offset)-1;
			setIndex((prev)=>prev === maxIndex ? 0 : prev+1);
	}
	const decreaseIndex = () => {
			if(leaving) return;
			toggleLeaving();
			setLeftRight(false);
			const totalMovies = movie!.length-1;
			const maxIndex = Math.ceil(totalMovies/offset)-1;
			setIndex((prev)=>prev === 0 ? maxIndex : prev-1);
	}
	const toggleLeaving=()=>{
		setLeaving((prev)=>!prev);
	};
	const onClick = (id:number)=>{
		areaClassification();
		detailMovieView("movie",id);
	};
	return(
		<SliderWrapper>
				<ArrowDiv>
					<Arrow xmlns="http://www.w3.org/2000/svg" fill="#181818" viewBox="0 0 448 512" onClick={decreaseIndex}>
						<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
					</Arrow>
				</ArrowDiv>
				<AnimatePresence initial={false} custom={leftRight} onExitComplete={toggleLeaving}>
					<Row
						variants={rowVars}
						initial="entry"
						animate="center"
						exit="exit"
						custom={leftRight}
						transition={{type: "tween", duration: 1.5 }}
						key={index}
					>
						{movie?.slice(1).slice(offset*index, offset*index+offset)
							.map(movie=>
								<Box
									key={movie.id}
									layoutId={`${movie.id+""}${id}`}
									variants={boxVariant}
									initial="normal"
									whileHover="hover"
									transition={{ type: "tween"}}
									bgPhoto={makeImagePath(movie?.poster_path)}
									onClick={()=>onClick(movie.id)}>
									<Info variants={infoVariant}><h4>{movie.title}</h4></Info>
								</Box>
								)}
					</Row>
				</AnimatePresence>
				<ArrowDiv>
					<Arrow xmlns="http://www.w3.org/2000/svg" fill="#181818" viewBox="0 0 448 512" onClick={increaseIndex}>
						<path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
					</Arrow>
				</ArrowDiv>
			 </SliderWrapper>
	);	
}

export default Slider;