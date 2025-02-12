import Vue from 'vue';
import Component from 'vue-class-component';
import { InjectReactive, Prop } from 'vue-property-decorator';
import { propRequired } from '../../../../../utils/vue';
import AppPopper from '../../../../../_common/popper/popper.vue';
import { Screen } from '../../../../../_common/screen/screen-service';
import { ScrollInviewConfig } from '../../../../../_common/scroll/inview/config';
import { AppScrollInview } from '../../../../../_common/scroll/inview/inview';
import { AppTooltip } from '../../../../../_common/tooltip/tooltip-directive';
import { ChatClient, ChatKey, isUserOnline } from '../../client';
import { ChatUser } from '../../user';
import AppChatUserOnlineStatus from '../../user-online-status/user-online-status.vue';
import AppChatUserPopover from '../../user-popover/user-popover.vue';

const InviewConfig = new ScrollInviewConfig({ margin: `${Screen.height / 2}px` });

@Component({
	components: {
		AppScrollInview,
		AppChatUserOnlineStatus,
		AppPopper,
		AppChatUserPopover,
	},
	directives: {
		AppTooltip,
	},
})
export default class AppChatMemberListItem extends Vue {
	@InjectReactive(ChatKey) chat!: ChatClient;
	@Prop(propRequired(ChatUser)) user!: ChatUser;

	readonly InviewConfig = InviewConfig;
	readonly Screen = Screen;

	isInview = false;

	get currentRoom() {
		return this.chat.room;
	}

	get isOnline() {
		if (!this.chat) {
			return null;
		}

		return isUserOnline(this.chat, this.user.id);
	}

	get isOwner() {
		return this.currentRoom && this.currentRoom.owner_id === this.user.id;
	}
}
