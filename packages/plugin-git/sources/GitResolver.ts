import {Resolver, ResolveOptions, MinimalResolveOptions} from '@yarnpkg/core';
import {miscUtils, structUtils}                          from '@yarnpkg/core';
import {LinkType}                                        from '@yarnpkg/core';
import {Descriptor, Locator, Manifest}                   from '@yarnpkg/core';

import * as gitUtils                                     from './gitUtils';

export class GitResolver implements Resolver {
  supportsDescriptor(descriptor: Descriptor, opts: MinimalResolveOptions) {
    return gitUtils.isGitUrl(descriptor.range);
  }

  supportsLocator(locator: Locator, opts: MinimalResolveOptions) {
    return gitUtils.isGitUrl(locator.reference);
  }

  shouldPersistResolution(locator: Locator, opts: MinimalResolveOptions) {
    return true;
  }

  bindDescriptor(descriptor: Descriptor, fromLocator: Locator, opts: MinimalResolveOptions) {
    return descriptor;
  }

  async getCandidates(descriptor: Descriptor, opts: ResolveOptions) {
    const reference = await gitUtils.resolveUrl(descriptor.range, opts.project.configuration);
    const locator = structUtils.makeLocator(descriptor, reference);

    return [locator];
  }

  async resolve(locator: Locator, opts: ResolveOptions) {
    const packageFetch = await opts.fetcher.fetch(locator, opts);

    const manifest = await miscUtils.releaseAfterUseAsync(async () => {
      return await Manifest.find(packageFetch.prefixPath, {baseFs: packageFetch.packageFs});
    }, packageFetch.releaseFs);

    return {
      ...locator,

      version: manifest.version || `0.0.0`,

      languageName: opts.project.configuration.get(`defaultLanguageName`),
      linkType: LinkType.HARD,

      dependencies: manifest.dependencies,
      peerDependencies: manifest.peerDependencies,

      dependenciesMeta: manifest.dependenciesMeta,
      peerDependenciesMeta: manifest.peerDependenciesMeta,

      bin: manifest.bin,
    };
  }
}
