import { request } from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
    return request({
        url: './recommend'
    })
}

export class goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.nowPrice = itemInfo.highNowPrice;
        this.desc = itemInfo.desc
    }
}

export class shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

export class goodsParams {
    constructor(info, rule) {
        // 图片可能有也可能没有，所以要做判断
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}