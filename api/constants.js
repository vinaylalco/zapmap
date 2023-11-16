import NDK from "@nostr-dev-kit/ndk"
import { setRelayListArray, connectNDK } from "../hooks/common"

window.live = true
export const mapstrpublickey = "a72863a4abfd79e340f736f3a6b967a0a0d992a6243d8edbebaead1f37586c4a"
const RelayList = setRelayListArray();
export const ndk = new NDK({
    explicitRelayUrls: RelayList
});
connectNDK(ndk)