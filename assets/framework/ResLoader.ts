// import { Asset, AssetManager, assetManager, Constructor, error, js, resources, __private } from "cc";
// export type ProgressCallback = __private.cocos_core_asset_manager_shared_ProgressCallback;
// export type CompleteCallback<T = any> = __private.cocos_core_asset_manager_shared_CompleteCallbackWithData;
// export type IRemoteOptions = __private.cocos_core_asset_manager_shared_IRemoteOptions;
// export type AssetType<T = cc.Asset> = Constructor<T>;
export type IRemoteOptions = Record<string, any>;
export type CompleteCallback<T = any> = (error: Error, resource: any) => void;
export type ProgressCallback = (finish: number, total: number, item: cc.AssetManager.RequestItem) => void;
export type AssetType<T = cc.Asset>  = new (...args: any[]) => T;

interface ILoadResArgs<T extends cc.Asset>
{
    bundle?: string;
    dir?: string;
    paths: string | string[];
    type: typeof cc.Asset | null;
    onProgress: ProgressCallback | null;
    onComplete: CompleteCallback<T> | null;
}
export default class ResLoader
{
    /**
     * 加载资源包
     * @param url       资源地址
     * @param complete  完成事件
     * @param v         资源MD5版本号
     */
    public loadBundle(url: string, v?: string)
    {
        return new Promise<cc.AssetManager.Bundle>((resolve, reject) =>
        {
            cc.assetManager.loadBundle(url, { version: v }, (err, bundle: cc.AssetManager.Bundle) =>
            {
                if (err)
                {
                    return cc.error(err);
                }
                resolve(bundle);
            });
        });
    }
    public parseLoadResArgs<T extends cc.Asset>(
        paths: string | string[],
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onComplete?: ProgressCallback | CompleteCallback | null
    )
    {
        let pathsOut: any = paths;
        let typeOut: any = type;
        let onProgressOut: any = onProgress;
        let onCompleteOut: any = onComplete;
        if (onComplete === undefined)
        {
            const isValidType = cc.js.isChildClassOf(type as AssetType, cc.Asset);
            if (onProgress)
            {
                onCompleteOut = onProgress as CompleteCallback;
                if (isValidType)
                {
                    onProgressOut = null;
                }
            }
            else if (onProgress === undefined && !isValidType)
            {
                onCompleteOut = type as CompleteCallback;
                onProgressOut = null;
                typeOut = null;
            }
            if (onProgress !== undefined && !isValidType)
            {
                onProgressOut = type as ProgressCallback;
                typeOut = null;
            }
        }
        return { paths: pathsOut, type: typeOut, onProgress: onProgressOut, onComplete: onCompleteOut };
    }
    private loadByBundleAndArgs<T extends cc.Asset>(bundle: cc.AssetManager.Bundle, args: ILoadResArgs<T>): void
    {
        if (args.dir)
        {
            bundle.loadDir(args.paths as string, args.type, args.onProgress, args.onComplete);
        }
        else
        {
            if (typeof args.paths == 'string')
            {
                bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
            else
            {
                bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
        }
    }
    private loadByArgs<T extends cc.Asset>(args: ILoadResArgs<T>)
    {
        if (args.bundle)
        {
            if (cc.assetManager.bundles.has(args.bundle))
            {
                let bundle = cc.assetManager.bundles.get(args.bundle);
                this.loadByBundleAndArgs(bundle!, args);
            }
            else
            {
                // 自动加载bundle
                cc.assetManager.loadBundle(args.bundle, (err, bundle) =>
                {
                    if (!err)
                    {
                        this.loadByBundleAndArgs(bundle, args);
                    }
                })
            }
        }
        else
        {
            this.loadByBundleAndArgs(cc.resources, args);
        }
    }
    public load<T extends cc.Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends cc.Asset>(bundleName: string, paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends cc.Asset>(bundleName: string, paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    public load<T extends cc.Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    public load<T extends cc.Asset>(paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends cc.Asset>(paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    public load<T extends cc.Asset>(paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    public load<T extends cc.Asset>(paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    public load<T extends cc.Asset>(
        bundleName: string,
        paths?: string | string[] | AssetType<T> | ProgressCallback | CompleteCallback | null,
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null,
    )
    {
        let args: ILoadResArgs<T> | null = null;
        if (typeof paths === "string" || paths instanceof Array)
        {
            args = this.parseLoadResArgs(paths, type, onProgress, onComplete);
            args.bundle = bundleName;
        }
        else
        {
            args = this.parseLoadResArgs(bundleName, paths, type, onProgress);
        }
        this.loadByArgs(args);
    }
    public loadDir<T extends cc.Asset>(bundleName: string, dir: string, type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends cc.Asset>(bundleName: string, dir: string, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends cc.Asset>(bundleName: string, dir: string, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends cc.Asset>(bundleName: string, dir: string, type: AssetType<T> | null, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends cc.Asset>(dir: string, type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends cc.Asset>(dir: string, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    public loadDir<T extends cc.Asset>(dir: string, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends cc.Asset>(dir: string, type: AssetType<T> | null, onComplete?: CompleteCallback<T[]> | null): void;
    public loadDir<T extends cc.Asset>(
        bundleName: string,
        dir?: string | AssetType<T> | ProgressCallback | CompleteCallback | null,
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null,
    )
    {
        let args: ILoadResArgs<T> | null = null;
        if (typeof dir === "string")
        {
            args = this.parseLoadResArgs(dir, type, onProgress, onComplete);
            args.bundle = bundleName;
        }
        else
        {
            args = this.parseLoadResArgs(bundleName, dir, type, onProgress);
        }
        args.dir = args.paths as string;
        this.loadByArgs(args);
    }
    public loadRemote<T extends cc.Asset>(url: string, options: IRemoteOptions | null, onComplete?: CompleteCallback<T> | null): void;
    public loadRemote<T extends cc.Asset>(url: string, onComplete?: CompleteCallback<T> | null): void;
    public loadRemote(url: string, ...args: any): void
    {
        cc.assetManager.loadRemote(url, args);
    }
    public release(bundleName: string = "resources", path: string)
    {
        var bundle = cc.assetManager.getBundle(bundleName);
        bundle?.release(path);
    }
    public releaseDir(bundleName: string = "resources", path: string)
    {
        var bundle: cc.AssetManager.Bundle | null = cc.assetManager.getBundle(bundleName);
        var infos = bundle?.getDirWithPath(path);
        infos?.map(function (info)
        {
            bundle?.release(info.path);
        });
        if (path == "" && bundleName != "resources" && bundle)
        {
            cc.assetManager.removeBundle(bundle);
        }
    }
    public get<T extends cc.Asset>(path: string, type?: typeof cc.Asset | null, bundleName: string = "resources"): T | null
    {
        var bundle: cc.AssetManager.Bundle | null = cc.assetManager.getBundle(bundleName);
        return bundle!.get(path, type);
    }
    public dump()
    {
        cc.assetManager.assets.forEach((value: cc.Asset, key: string) =>
        {
            console.log(key);
        })
        console.log(`当前资源总数:${ cc.assetManager.assets.count }`);
    }
}
export let resLoader = new ResLoader();