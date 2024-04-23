// const mapService = require('../app/services/map.service')
//
// async function search(){
//    let result = await mapService.SearchAddress('lý tự trong, cần thơ', 10)
//     console.log(result)
// }
//
// search()
//
//
// let lat = 10.0342205
// let long = 105.7797728
// // 32.42961626387935, 105.80719863691581
// async function get(){
//     let result = await mapService.ReverseGeoCoding(lat, long)
//     console.log(result)
//
// }
//
// // get()

// Chuỗi mẫu

// const s1 = "mjebRoqgwhEbPw\vu@qeCtDoLrAwFuGaBis@kRyEoA_RsEsLwAaTUcLnBeS~Dkc@vIwDp@}sAbWuq@hMiKlBip@pLqo@jLa[zF__@lFqj@bHmBTuN|AcGd@oF^_P|@csFnVyLz@sLrAos@nKs@Jan@|Ioc@bGaEj@oi@`HahAcpAeFnGzRdUxh@xm@lAtAtFbH";
// const s2 = "cqpbRsikwhE|_BsXjKiB_BgJiKlBip@pLqo@jLa[zF__@lFqj@bHmBTuN|AcGd@oF^_P|@csFnVyLz@sLrAos@nKs@Jan@|Ioc@bGaEj@oi@`HahAcpAsKuL{Xa[kKsLqH{IgJuJmJ{J";

// const target_date = new Date('2024-04-22');
//     const date_start = new Date(
//       target_date.getFullYear(),
//       target_date.getMonth(),
//       target_date.getDate()
//     );
// console.log(target_date)
// const target_date = new Date('2024-04-22');
// console.log(target_date)
// let trip = {
//     start_date: new Date("2024-04-22"),
// }
// trip.start_date = 1
// console.log(trip)

// const origin_city = undefined || "asd";
// console.log(origin_city)
// return
// const origin_state  = undefined; 
// const origin_county  = "asdas"; 
// const t = "asdas"
// if(origin_city == t || origin_state == t || origin_county == t){
//     console.log("true")
// }

// Function to calculate Levenshtein Distance between two strings
function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + cost
                );
            }
        }
    }

    return dp[m][n];
}

// Function to compare two geometries
function compareGeometries(geometry1, geometry2) {
    let totalDistance = levenshteinDistance(geometry1, geometry2)
    const totalLength = Math.max(geometry1.length, geometry2.length);
    const similarity = 1 - (totalDistance / totalLength);
    return similarity;
}

// const you = "_@pSlo@d]zDtB~EdCjItEtTnLdVnLlOzFdWdKn\\`MhRvGxRdHbh@dR`T~Hta@nOl]nM`\\xLhZpKdXrJ|]hNbDjA|f@pQjTrIhX|KpZpOl\\lOhGpDvCdB|VzN~d@zW|IlFnN`JzUbNfY|M~N~FjjAr`@r|@fYtz@dZdHjCns@zVd`@|Lx_@zL|MvDh\\bIdgAvTrxAnX`jDdp@~NxClJ~AtLhAhSbAlqEbJ~_AtA`\\d@~xCdG~bAbBrwAE|yAsArv@Ibq@[tDAp{@a@npAwApu@Hph@h@j]tArq@zDlMr@bw@pEz\\nBtgAhGvp@rDpk@jDzJ`Ab_@tFz\\tG|MnC~QlFvJ|CbO~GbMlHnm@ba@`s@bk@bZbVjkA|~@|NlNvFnFhGfIdE|HlD`J`CtIxBzNxArOz@bMdCna@b@lKRnJ?dMQt^y@to@wDv^mFpf@{InnAaHhl@aAtNYj]h@`P`BrMnQ|s@pDnOtCxMbB`Kt@fIFjIYbJy@nIcBdJ{BfMsSpx@gW~bAgEbN}H|T}G|OqGdNoP~^cNp\\__@d_AoIbQ{HbNmMhReOvRai@po@iElGiD`GgDjJcBhIcAzIWpHLbH\\nGRbC|ApKhBhGjFdMjHhKhH`IhJpHvHvE`JdDnK`Cl]fIhE`B`IjDhXjMzQtK~M|JdJdHnLdKdHvGnGxHvFxH|J`ObHrMlFjMlE`O`BhIlFlc@r@vHLfMTvY@tD@|GvAhv@lBnk@dApRhBxQzCxPdCrK|DrMjGjQdH~MfHxLrF|HpW`ZrdA|eA~DbE`MpM~K`LnQhRtF|F`YtYnFzF`NpNzDzDzPjQtUbV`pApqA`{@v|@n_@``@jZzZ`GxGxGnJz@nAbFvIfAnB`FdKvExK~ErLhExMtCnKbUb_AtOdq@f@xBpNbn@tLhh@zEvRbNnj@zBlLhExTrBdNz@tK`@b]JvIJhHp@xj@V~Rx@rp@JnHFdFVrSTdSJnIDxCL~Lf@haAHhWDlRs@bOq@bKeApPoCpl@qC~h@m@bLc@jIkAnTGtAu@bPMhCmAzWcCxe@gAnTOpCYxF[tIcCdp@_AlMs@|JeAxHmDbV_DpR}@lFcDjTwAhJyKxn@w@jFmGzb@{Gba@_U|uAgAdGwF|_@kE~ZkAvLm@nJnAlNfAlSxi@~mEp@~D`G`f@|zAnjMvRzlAxbArwHfCxOrPplAzv@|tFnE|UbKtr@~Ktv@rWfhB|Kzx@~B|PnVnhBrF`b@|K`z@|TxbBhHbh@nTv{A~Ed]lFv]xNp`AnJxq@rG|d@pEjYdDzN`E`QxIhZ|Kh\\dGpQxXzy@nHvTjI|UlE|K\\|@hFzMnHpPtJtQvHfL|FdIfSpVxW~Yb\\``@h@h@fJfK|BfCjEtFrK~M|G`KhF~JtCtH|BxHdChJ|B`KzAvJz@|Ij@jKRlL?xLk@~^y@`z@aAn`Aw@zo@OxUQ`Ng@~m@eA~u@c@xd@ShZIpWg@xc@BrJ]rf@Sn`@Qbh@PjKj@fLvBbQbCrMvBvIdDpKvC`IzEbKnM|Ujf@by@xYfe@v[tg@`JvNxA`CbI~Mrs@zlApOnWdG`KjGjIjJxKzGlHpGzF~EbEjGnExHvE`GrDbGnD|HhDtHjDnKfD`FxAdJpB`JdBpHrAtB^rJ`BjVdDrMjBxSvClTrCrJlAnQ`Chn@dIp^~E`d@bGnSxK~G~GjHdKrC`JjAhMLxS}uB~~O{LxaAm|AvjLmIx\\}En`@kC~SaFhm@oHnk@wH|c@aK~r@mOveA}C~W}BlXlAxRnFbPjKvLhSvJhQ~BjQkBpQiGdR}JtR_MvOwGnRiEhUeB`W\\dX`CzT`E~]jH|gBzg@hsSplG~t@lU~s@zS|_AbY~bAxa@fu@jb@huApdAz_AvaApaAbjA|v@lrAnmC|dGr{AdiDreCtnFjc@jkAdb@`oAh\\voAtXttAdnCbjTnVhjBdGff@vL|_AjRvxAbdAzcHvZhnBrx@rzDbDjNx`AjhDn^~kAjDtK`d@|oAbkFt|M|lCdtGv~Eh{L`iBvhEzsBx~Ev~Gz{Ohw@|lBvg@v_B`d@vlBj[jrBtRb`CnFj_DyKxxCiU`hC{aBj`N}_BpwMiKb{@}cAh`I_H~p@s{OtarA_g@~zGuBbYgjFfds@_w@rvMgC|b@oxA|pVkHboAo`@|wG{b@hmHa\\|yVdF|aBvYtoFdj@`~OfqBrtZda@fhG~dDpsn@~j@fkNrLxoC`TzgFfbAbfVzbClt`@lnCpwa@td@bbInKddB`KhrBrvBbyb@vrC`dg@d_@b|ChK|s@zl@d{Cd_AlnD~jArkDfg@xkAdl@duAv_Bh}C|fBnsCffBffCblJnrLp_@xe@pmAv|A|}d@v`j@f_C|oCtNhQd|RnqUd_Ztc^jsE~yFrL`OzhTzdXjnBlfCxjBloCrdBhtCnhCrxE~cO`qXf|@h{Apz@|qA|_ApnA`dAhhA|cAhaAjgAt|@dqAt|@pi[~wPlsEpeC`[vPdcGvcDhnFnuCjqA`y@feA`t@psA`eArhAxbA|cQlxP~gPr_Pfd@tc@fLrKlUnUlX`XjdAhcAvNlNzLpMhoB`tBfLpNrbCvyCbcHdvJraGdkIriAjvAt~AhdBne@vd@nm@pl@fgBpwA`_BblA~jF`jDtzFhvDbrAp{@lp@hd@~f@f^tf@v^hf@b_@|e@t_@pe@``@de@p`@xd@~`@jd@la@`d@za@rc@hb@dc@tb@xb@dc@lb@pc@~a@~c@pa@ld@ba@xd@t`@de@z_@de@n_@ne@~^|e@r^hf@b^rf@t]`g@f]jg@x\\tg@h\\`h@z[lh@l[th@|Zbi@lZji@~Yti@nY~i@~Xhj@pXrj@`X|j@d``A|wsBvIjRvuGboNdlDlpHdgBf{Dbi@xbA|k@x_Abi@nw@th@hr@br@fw@px@zy@bw@ht@hr@tk@tx@fk@he@b\\he@nYhjAdn@~t@t^z{@d`@~}@h\\`p@xT|bAnZttAnZxmAdUht@lL|S`DtiDjk@f_B~VlR|CxfCd`@tuBf_@xsBp\\xaCr_@~~AlW`SbDdTlD`RxC`jFzz@|cApPt`Ct`@vTrDzvKznB`yGpmAvsAxWlpD~m@ff@bKnd@|Kpc@rMjb@dO~[fMhWrKvZ~Nb[pPjZbRz_@xXpj@pd@~j@ng@jnCtjCxkK~jKzFxFh~Bp|BriAvfAbjEdlExxBvzBzg@dk@jd@rh@r_@|f@fe@lo@jo@z_Ajj@r~@r{@x|AbFzJn|AxzC~uAxlCvwPzp[zE`Jl_CjmEjjItyPx`@|hAlJ~Wnz@`aCtrBtfIdiA|hGp}BdbO`Mfn@lQ`n@rVtq@xXtp@~\\to@xdGjyIl|EbqIpkD`nI~b@dhA`G|Pdb@pmAv[rgAnOhk@lOro@tNxs@vaEjkTvFpZp\\hoB|Ml{@vJ~u@nIhs@lPrjBhCh]|QzmC|O`lC~Zp~Fd_@htGzIzmAzLvkApVlhBlRvpAttDd`Rfi@xjChUtzAjRr{AzMnsAdKfkAtGhjArFv`BfEhkAxBniAv@vmAuArjAuBdpAgCtcAgCxeAiHtgDmS|{HyB|~@w@jt@}@vgAL`gATzLdAjl@fEraAxH`hApJr_AzLvdAlApHnCfNxNjx@xQvaAfcBjmIhfBzuIhlAt}FtOry@tL`{@hIpx@tEpm@tDp{@pApk@E`p@iAbr@uCvt@gEbn@cGxn@QvAeHlh@eo@drEiL~_AyHj{@gGl`AuD|`AcBr|@sIxzGyOtuKqD`}BsG~wDkFpvEsTn~OaSnrNqFvaEuF`zDd@dfA`B|bAvD`~@vEfs@hGvp@dl@`tF`LjwAhGdgA|Gr|ArEbaB~{@`sVjV~nNfCthGaHntFe\\~fFyL`uA_uErd_@su@n`G{Jbv@u_ArcICJuD`[giHlul@mHbdAiC`dA?dbEj@v{AdJt{BpgEhrf@nCh[`D~^|NzaEo_@t~l@mMjpXaTltGe]r~Dkb@htC{m@jpCyuG~~Ua|Ch_KomDzlMuqAjrEud@lsByg@bnDmk@z|H{oA|bRmvAfzSuJlfAuWvgBg\\l`Bc^`_Bip@ntBmdIxaVqoJzdYq|@~aDiS~cBwJz`BcA`lAdNrhSnG~{IbKbiIfLn_LvWtyNzKfgBrVhcBjPdaArh@|cChs@|{Bh~Kfu[zxApbEfzB`uGxWjs@zoCd|Hpa@flAnFrOnk@tbB~nHrkTnpCvmLttCzcRhsD`tU`tBv~M`}@lwFpi@xeExVnmDnNpmE~GnhHdJhuR|EfnFzHb|MvKvuSdMd|CrVvdCdXn|Bn`@vvBnp@vdCluGlvSrvB~rGtg@x}Ahs@hzBftHpwUvyLxq_@lKv_@zJ~_@jJd`@xIj`@fIp`@vHv`@lG|]|F`^nFd^`Fh^pEj^bEn^rDl^b^pvG`s@b}JvgA|nQfCfk@tBhk@bBlk@nAlk@~@lk@j@rj@Ztj@Hrj@Gtj@Ytj@i@rj@}@vj@aEfvEuMtrIka@tnV}Ar_AOh]a@b]u@`]eA`]wA`]iB|\\{Bz\\mCx\\_Dv\\oDr\\cEn\\sEj\\eFf\\wFb\\gG|[yGv[_HnZmHjZ}HbZmI~Y}IvYkJpY{JjYiKbYyKzXgLrXwLjXs_IfwPe|IvuQuC|FyWpi@sNrUiRdTmTtPwTxKiYtKqjCbs@{^tOoXvM{CrBiDvCcEdEeE`FqDlFgEvG{D~GqDtHwCpHiCrHsBfIeBdHaAzG{@~Ic@xPTbY|BxWfDnTfF`SpIxQxJ`QdLlNbPvO`RlLbR`IvR`GvRjDbPrA`T`A`YUrXUfXm@`X?tV~@h[tEtX`I`VbKvTjLv_@vXhyAnaB~dE|{F`h@jo@bp@r}@pv@leAnaAnsAzbCljDh@n@hUxZn~F`}HjbGxpHrmAtxAnu@tx@by@j_A||@bbAfqMfzNhWpYvm@fr@nt@~v@rq@zq@lShWzoBvwBtkElyEhfBdiBvXtYdXn\\xp@dy@l[x]pcGhxGle@th@`e@~h@td@li@dd@zi@xc@bj@jc@pj@~b@|j@nb@fk@bb@tk@ta@|k@fa@jl@db@pn@va@~n@da@ho@v`@to@f`@~o@v_@jp@h_@vp@v^`q@d^jq@f|Z|ll@zoD`eHha@jx@x[rr@r_@~y@pN`^p_@lbAh`@nfA|s@jiCxe@l{Bz\\`wBxX~mB~_ArwHlu@paGzJ`v@fmAxsJnx@~uGlMbeA~AlLnE~[xc@hdD|Dz]fCdUvq@vyFhDb_@jKzeA`Fdj@hIxjA|KvjDl@hyAgA`}AcCxuAkIp{AkKlsA_Ijy@mE|`@q]|fC{cBhxJuBfKig@tqCio@rnD{R~eAqGx[mJbd@sLri@aMpk@wp@`lCoXfbAky@pnCyo@boBmKt[qeBlgFcVvu@oc@|sA{rArzD}a@bmAkM|_@cRvi@ww@~}BykB~yF}b@flA}X~|@_Pvm@}XdiA_Qxq@}TbbA_Pzv@}L|w@q^`cDww@reHyWjyBsJlmAm@~EcH`}@}HhnAaIjpCCvw@rAhlE`C|xA`AjqAOvpAi@|mAX|dAzFfuDzNhlG~I~bEtEhdEtB~fGjE`|FfA`kA[riAMnUEpEChDA~oBsDxzAmDvhA{G|gAqIddAgLrdAukBrvNuJjw@cg@`aEcd@hnDgNhhAaMfbAko@dwFiu@ptH{_AnaKedAftKm\\pcCyPvkAeC`P_DlPiEhOiFxKmInN{NlQub@zb@gJ`MqElHaG`MeDnIaClRUjPV`PnBxPrCjNtEnLlFlKdEpGtFdHlAjAfcAb`A|a@na@~tAfuAlWbYdW~Ztz@xbAj`@nc@jNjLjNfIpTbIdVdFnQ|C`U~AtTc@~e@iEhVaCjVU`V^rYbE~W`IxSrKz_@|Y~YtUzd@r\\rStQ|BpBvBjBfAbA|GjG`d@ra@zGhGhl@rj@vr@`r@riA`pAzXr\\hJrLhGzJt`@ve@lm@xr@`x@vy@~HnIrDhAlaAhdAj@tDzFzF|}A|}AhHhHlNzMtBnBlMrJ~XbR~Y~UnmGphFrHlIbFnM|{@f~@`ClC`wAl~AdyA|qBnx@tdAnVrYlaAh~@tPbMlmA|kAdAbAhBhBhRzQd|@jy@zsBroBdHzG~BvBfXtVdVxSfx@nw@fTxSfhAlfA|~@d_A`VzVbc@hd@nIzKbuAxdBtCnDrB`D`F|GjE`Gdg@tjAfeCllGr{BphGd`CxdGxqAdxCh\\~u@vYfo@tlBjmEn_@l}@|DzIbOt\\tBfEvB`E~EtH`BjCpBxCnBpChBzBhGxGjEdEtDjDbEvD`DlCzDhDjE`DlwAbbA|ErDvDdDpG|FrDrDdEjElFbGjC|CbEpFtEtH|DxGvGfMbCpFnCpGxBnGnBtGnA~DbAxDbBrHnA|GvAtHzApK|@jKd@lH\\fGXlILnH?`Is@hU]dJi@xIqCn`@oKhvAsEzIsDtEaCdB_BdAyBh@kE`A_KjAm[UagAaBqj@I{UIc]KmGl@mG\\q@`GKtHTbHl@bC[~MWfLg@tUm@xZaApb@gAhk@WpKUlIAt@KpDG`EStEKtDCp@sBvp@aAz`@}@xXi@pPI~DOxDKnFGhDcBly@Q`ImAvk@K~EGrCoAhj@KjES`EkC~g@eEtm@]~EQxBkJrfAu@fJ[vD{BQe[eCmFa@sVaCaCUgBCge@yAoj@}AaEOeH]}j@}Bmc@eBe\\g@i[Co\\DeB?gPD}CA{JAuDAuC@cVD}B?cNBcF@oB@oSH}F?cH?_SBiBwBPmX"
// console.log(you.length)
let you = ""
for(let i = 0; i < 16000;i++){
        you += "a"
}
console.log(you.length)
// return
// console.log(you.length)
// let a = ""
// let b = ""
// for(let i = 0; i < 20000;i++){
//     a += me
//     b += me 
// }
// console.log("a", a.length)
// const t4 = "0123456789"
// const res1 = CompareRouteByGeometry(t1, me)
// const res2 = CompareRouteByGeometry(t2, me)
// const res3 = CompareRouteByGeometry(t3, me)

// const res_total = compareGeometries("youb", "b")
// console.log("res1", res1)
// console.log("res2", res2)
// console.log("res3", res3)
// console.log("total", res1 + res2 + res3)
// console.log("res_total",res_total)


// Ví dụ về sử dụng
const str1 = "string1";
const str2 = "string2";
const distance = compareGeometries(you, you);
console.log("Damerau-Levenshtein distance:", distance);