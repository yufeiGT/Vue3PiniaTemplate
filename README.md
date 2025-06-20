## Vue 3 项目开发模板

-   一套基于 Vue3 的项目模板
-   NodeJS v20.18.0
-   支持 Sass
-   集成 TypeScript
-   集成 Ant Design Vue
-   集成 @gluttons 工具包

#### 确保已经全局安装 Vue CLI 5 和 Webpack

-   npm i @vue/cli -g
-   npm i webpack webpack-cli -g

#### 使用方法

-   npm i 安装依赖模块
-   npm run serve 运行开发模式
-   npm run build 打包项目

---

## 前端规范

-   制定人：GT
-   制定日期：2024 年 1 月 6 日
-   修改日期：2024 年 6 月 4 日
-   联系邮箱：769416198@qq.com

---

#### 项目开发 src 目录架构

<table>
    <thead>
        <tr>
            <td>文件名称</td>
            <td>子文件名称</td>
            <td>使用方式</td>
            <td>描述</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="4">api</td>
            <td>-</td>
            <td>import * as API from '@/api';</td>
            <td>请求的 API 函数文件</td>
        </tr>
        <tr>
            <td>lib</td>
            <td>-</td>
            <td>API 资源包</td>
        </tr>
        <tr>
            <td>index.ts</td>
            <td>-</td>
            <td>API 入口</td>
        </tr>
        <tr>
            <td>launcher.ts</td>
            <td>-</td>
            <td>@gluttons/launcher 实例</td>
        </tr>
        <tr>
            <td rowspan=4>assets</td>
            <td>-</td>
            <td>-</td>
            <td>资源文件夹</td>
        </tr>
        <tr>
            <td>icons</td>
            <td>-</td>
            <td>SVG 图标</td>
        </tr>
        <tr>
            <td>images</td>
            <td>-</td>
            <td>图片资源</td>
        </tr>
        <tr>
            <td>stylesheets</td>
            <td>-</td>
            <td>全局样式表</td>
        </tr>
        <tr>
            <td rowspan="3">components</td>
            <td>-</td>
            <td>-</td>
            <td>Vue 组件</td>
        </tr>
        <tr>
            <td>Charts</td>
            <td>-</td>
            <td>echarts 图表组件</td>
        </tr>
        <tr>
            <td>Icon.vue</td>
            <td>-</td>
            <td>SVG 图标组件</td>
        </tr>
        <tr>
            <td rowspan="4">directives</td>
            <td>-</td>
            <td>-</td>
            <td>Vue 指令文件</td>
        </tr>
        <tr>
            <td>Loading</td>
            <td>v-loading="xxx" 或 v-loading.body="xxx"</td>
            <td>加载中</td>
        </tr>
        <tr>
            <td>ScrollToTop</td>
            <td>v-scroll-to-top="callback"</td>
            <td>滚动到顶部</td>
        </tr>
        <tr>
            <td>index.ts</td>
            <td>-</td>
            <td>指令入口</td>
        </tr>
        <tr>
            <td rowspan="3">entity</td>
            <td>-</td>
            <td>import * as Entity from '@/entity'</td>
            <td>实体</td>
        </tr>
        <tr>
            <td>lib</td>
            <td>-</td>
            <td>实体资源包</td>
        </tr>
        <tr>
            <td>index.ts</td>
            <td>-</td>
            <td>实体入口</td>
        </tr>
        <tr>
            <td rowspan="3">enum</td>
            <td>-</td>
            <td>import * as Enum from '@/enum'</td>
            <td>枚举</td>
        </tr>
        <tr>
            <td>lib</td>
            <td>-</td>
            <td>枚举资源包</td>
        </tr>
        <tr>
            <td>index.ts</td>
            <td>-</td>
            <td>枚举入口</td>
        </tr>
        <tr>
            <td rowspan="2">store</td>
            <td>-</td>
            <td>-</td>
            <td>Pinia 仓库</td>
        </tr>
        <tr>
            <td>auth.ts</td>
            <td>-</td>
            <td>用户授权</td>
        </tr>
        <tr>
            <td>utils</td>
            <td>-</td>
            <td>import * as Utils from '@/utils';</td>
            <td>工具函数文件</td>
        </tr>
        <tr>
            <td>views</td>
            <td>-</td>
            <td>-</td>
            <td>路由视图文件</td>
        </tr>
        <tr>
            <td>App.vue</td>
            <td>-</td>
            <td>-</td>
            <td>Vue 入口文件</td>
        </tr>
        <tr>
            <td>main.ts</td>
            <td>-</td>
            <td>-</td>
            <td>程序入口文件</td>
        </tr>
        <tr>
            <td>router.ts</td>
            <td>-</td>
            <td>-</td>
            <td>路由配置文件</td>
        </tr>
    </tbody>
</table>

---

#### 引用规范

-   各项不同的引用空出一行隔开
-   API、Entity、Enum、Utils 必须以 import \* as API from '@/api' 方式引用，不能以 import { Auth } from '@/api' 方式引用
-   组件必须用 Vue 作为后缀方便识别，如 import TestVue from './test.vue'

> 引用顺序

```JavaScript
// 外部包
import { ref, computed } from 'vue';
import * as KotronGlobal from '@gluttons/es-tools';

// @ 的 interface、enum、type 等
import * as Entity from '@/entity';

// @ 的工具类，API等
import * as Utils from '@/utils';
import * as API from '@/api';

// @ 的组件
import HeaderVue from '@/components/header.vue';

// 内部功能模块
import { useQuery } from './use';

// 内部组件
import TestVue from 'test.vue';
```

---

#### 注释规范

-   由于 typescript 不支持单行注释的解释，因此要求所有的输出（Entity、Enum、API、函数等）使用多行注释，禁止单行注释

```JavaScript
// 统一使用此多行注释规范
/**
 * xxxx
 * @description xxxx
 * @param xxxx
 * @returns xxxx
 */
// 不允许此多行注释
/** xxxx */

```

> 范例

```JavaScript
// userAuth.ts
export interface UserInfo {
    /**
     * 用户 ID
     */
    id: string | number;
    /**
     * 用户名
     */
    username: string;
    /**
     * 用户昵称
     */
    nickname: string;
    // 不符合本规范的注释
    /** 图片 */
    picture: string;
}
```

-   其他代码内部可使用单行注释

```JavaScript
function Login(username: string, password: string) {
    // 执行登录
    return launcher.get('/login', {
        username,
        password,
    }).then(res => {
        // 成功
    }).catch(err => {
        // 失败
    });
}
```

---

#### Entity 规范

-   输出名称

> 除 global.ts 文件外，所有实体必须以文件名加大驼峰在 index.ts 输出

```JavaScript
// userAuth.ts
export * as UserAuth from './lib/userAuth.ts';
```

-   实体每个属性都应编写注释

-   需包含 getDefault 函数

> 使用 namespace 方式导出 getDefault 函数

```JavaScript
// userAuth.ts
export interface UserInfo {
    /**
     * 用户 ID
     */
    id: string | number;
    /**
     * 用户名
     */
    username: string;
    /**
     * 用户昵称
     */
    nickname: string;
    /**
     * 图片
     */
    picture: string;
}
export namespace UserInfo {
	/**
	 * 获取默认值
	 * @returns
	 */
    export function getDefault() {
        return {
            id: null,
            username: '',
            nickname: '',
            picture: ''
        }
    }
}
```

---

#### Enum 规范

-   输出名称

> 除 global.ts 文件外，所有枚举必须以文件名加大驼峰在 index.ts 输出

```JavaScript
// userAuth.ts
export * as UserAuth from './lib/userAuth.ts';
```

-   包含 enum 和 type 的定义

-   使用 namespace 方式导出 getDescription 函数

```JavaScript
// userAuth.ts
export type UserType = 'A' | 'B' | 'C';
export namespace UserType {
	/**
	 * 获取描述
	 * @param value
	 * @returns
	 */
    export function getDescription(value: UserType) {
        switch(value) {
            case 'A':
                return '用户类型A';
            case 'B':
                return '用户类型B';
            case 'C':
                return '用户类型C';
			default:
				return '枚举错误';
        }
    }
}
```

---

#### API 规范

-   输出名称

> 所有 api 必须以文件名加大驼峰在 index.ts 输出

```JavaScript
// userAuth.ts
export * as UserAuth from './lib/userAuth.ts';
```

-   api 名称使用大驼峰命名方式

```JavaScript
export function GetUserInfo() {
    // ...
}
```

-   定义 api 时，必须设定请求失败默认值

```JavaScript
export function Login(){
    return launcher.get<Entity.Auth.UserInfo, undefined>('xxxx', {}, {
        // 设定默认值
		defaultResponse: Entity.Auth.UserInfo.getDefault(),
    });
}
```

-   带参数的请求，如需要添加请求参数的 interface，需要在返回实体的 namespace 内定义 RequestParams，不允许在别处定义

```JavaScript
// api/lib/auth.ts
export function Login(params: Entity.Auth.UserInfo.RequestParams) {
    return launcher.post<
		Entity.Auth.UserInfo,
		Entity.Auth.UserInfo.RequestParams
	>('xxxx', params, {
		defaultResponse: Entity.Auth.UserInfo.getDefault(),
	});
}

// entity/lib/auth.ts
export interface UserInfo {
    // ....
}
export namespace UserInfo {
    /**
	 * 请求参数
	 */
	export interface RequestParams {
        // ...
    }
}
```

---

#### 路由视图（.Vue）规范

> 为规范代码及提高代码封装思维，这里使用 Use 模式进行视图与逻辑代码分离，以功能块进行逻辑封装。提高代码可读性，使逻辑代码更加清晰简洁

| 文件名      | 描述                       |
| :---------- | :------------------------- |
| index.vue   | 视图入口                   |
| use.ts      | 可复用的逻辑代码           |
| use.xxxx.ts | 按功能区分的可复用逻辑代码 |

---
