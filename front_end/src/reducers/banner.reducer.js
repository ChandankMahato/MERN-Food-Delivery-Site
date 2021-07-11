import { bannerConstants } from "../actions/constants";

const initState = {
    banners: [],
    error: null
};

const buildNewBanners = (banner) => {
    let myBanners = [];
        const newBanner = {
            _id: banner._id,
            bannerName: banner.bannerName,
        };

        myBanners.push(newBanner);
        return myBanners;
}

export default (state = initState, action) => {
    switch(action.type){
        case bannerConstants.GET_ALL_BANNER_REQUEST:
            state = {
                ...state,
            }
            break;
        case bannerConstants.GET_ALL_BANNER_SUCCESS:
            state= {
                ...state,
                banners: action.payload.banners
            }
            break;
        case bannerConstants.GET_ALL_BANNER_SUCCESS:
            state ={
                ...initState
            }
            break;
        case bannerConstants.ADD_BANNER_REQUEST:
            state = {
                ...state,
            }
            break;
        case bannerConstants.ADD_BANNER_SUCCESS:
            const banner = action.payload.banner;
            const updatedBanners = buildNewBanners(action.payload.banner)

            state = {
                ...state,
                banners: updatedBanners,
            }
            break;
        case bannerConstants.ADD_BANNER_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
            break;
        case bannerConstants.DELETE_BANNER_REQUEST:
            state = {
                ...state,
            }
            break;
        case bannerConstants.DELETE_BANNER_SUCCESS:
            state = {
                ...state,
            }
            break;
        case bannerConstants.DELETE_BANNER_FAILURE:
            state = {
                error: action.payload.error
            }
            break;
    }
    return state;
}