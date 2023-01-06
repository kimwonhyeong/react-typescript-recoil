const API_KEY = "78d3661b3f421209a4bf9afef8d244b1";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number;
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface IGetMoviesResult {
	data:{
		maximum: string;
		minimum: string;
	};
	page: number;
	results:IMovie[];
	total_pages: number;
	total_results: number;
}

export interface IGetbestGrade {
	page: number;
	results:IBestGradeResult[];
}

export interface IBestGradeResult {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface IPopular {
	page: number;
	results:IPopularResult[];
}

export interface IPopularResult {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface IGetVideoResult {
	iso_639_1: string;
    iso_3166_1: string;
	name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface IGetVideo {
	id: number;
  	results: IGetVideoResult[];
}

interface A{
	english_name:string;
	iso_639_1:string;
	name:string;
}

export interface IGetDetailMovie{
	adult: boolean;
	backdrop_path: string;
	belogs_to_collection:{
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};
	budget: number;
	genres:[];
	homepage: string;
	id: number;
	imdb_id:string;
	original_language:string;
	original_title:string;
	overview:string;
	popularityk:number;
	poster_path:string;
	production_companies:[
		{
			id:number;
			logo_path: string;
			name: string;
			origin_country: string;
		}
	];
	production_countries:[
		{
			iso_3166_1:string;
			name: string;
		}
	];
	release_date:string;
	revenue: number;
	runtime: number;
	spoken_languages: A[];
	status: string;
	tagline:string;
	title:string;
	video:boolean;
	vote_average:number;
	vote_count:number;
}

interface IGetRecommendResult{
	adult: boolean;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface IGetRecommend{
	page: number;
	results: IGetRecommendResult[];
}

export function getMovies(media:string){
	return fetch(`${BASE_PATH}/${media}/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`)
		.then((response)=>response.json());
}

//getMovies api의 id
export function getVideo(media:string,id:number){
	return fetch(`${BASE_PATH}/${media}/${id}/videos?api_key=${API_KEY}&language=ko-KR`)
		.then((response)=>response.json());
}

//getVideo api에서 key
export function getYoutube(key:string){
	return fetch(`https://www.youtube.com/watch?v=${key}`)
}

export function getDetailMovie(media:string,id:number){
	return fetch(`https://api.themoviedb.org/3/${media}/${id}?api_key=${API_KEY}&language=ko-KR`)
		.then((response)=>response.json());
}

export function getRecommend(media:string,id:number){
	return fetch(`https://api.themoviedb.org/3/${media}/${id}/recommendations?api_key=${API_KEY}&language=ko-KR&page=1`)
		.then((response)=>response.json());
}

export function bestGrade(media:string,){
	return fetch(`https://api.themoviedb.org/3/${media}/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`)
		.then((response)=>response.json());
}
export function popular(media:string,){
	return fetch(`https://api.themoviedb.org/3/${media}/popular?api_key=${API_KEY}&language=ko-KR&page=1`)
		.then((response)=>response.json());
}
export function search(media:string,keyword:string){
	return fetch(`https://api.themoviedb.org/3/search/${media}?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`)
		.then((response)=>response.json());
}

//============================================
export interface IgetTvDetail{
	adult: boolean;
	backdrop_path: null;
	created_by: [
		{id: number;
		credit_id: string;
		name: string;
		gender: number;
		profile_path: null;}
	];
	episode_run_time: number[];
	first_air_date: string;
	genres: [];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: null;
	last_episode_to_air: null;
	name: string;
	next_episode_to_air: null;
	networks: [ ],
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: [ ],
	production_countries: [ ],
	seasons: [ ],
	spoken_languages: [
		{
			english_name: string;
			iso_639_1: string;
			name: string;
		}
	],
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}
export interface IGetTvRecommend{
	page: number;
	results: IGetTvRecommendResult[];
}
export interface IGetTvRecommendResult{
	adult: boolean;
	backdrop_path: null;
	id: number;
	name:  string;
	original_language:  string;
	original_name:  string;
	overview:  string;
	poster_path:  string;
	media_type:  string;
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}
export interface IGetTv{
	page: 1;
	results: IGetTvResult[];
}
export interface IGetTvResult{
	backdrop_path: null;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	name: string;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
}
export function getTv(){
	return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&page=1`)
		.then((response)=>response.json());
}

export function getTvVideo(id:number){
	return fetch(`${BASE_PATH}/tv/${id}/videos?api_key=${API_KEY}&language=ko-KR`)
		.then((response)=>response.json());
}

export function getTvDetail(id:number){
	return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=ko-KR`)
		.then((response)=>response.json());
}

export function getTvRecommend(id:number){
	return fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=ko-KR&page=1`)
		.then((response)=>response.json());
}

export function bestTvGrade(){
	return fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`)
		.then((response)=>response.json());
}
export function popularTv(){
	return fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`)
		.then((response)=>response.json());
}
export function searchTv(keyword:string){
	return fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`)
		.then((response)=>response.json());
}