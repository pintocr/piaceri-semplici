export interface IUI{
    loggedIn: boolean;
    waitingForResponse:boolean;
    signupVisible : boolean;
}

interface IAssetData {
    _id: string;
    asset_name: string;
    asset_value: number;
  }

export interface IBM{
    assets:IAssetData[]
}


export interface IState{
    UI:IUI;
    BM:IBM;
}

// initial state 
export const initial:IState = {
	UI: {
		loggedIn: false,
        waitingForResponse: false,
        signupVisible: false,       
	},
	BM: {
        assets:[]
	}
};
