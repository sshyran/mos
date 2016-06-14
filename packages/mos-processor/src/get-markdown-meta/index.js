import readPkgUp from 'mos-read-pkg-up'
import gh from 'github-url-to-object'
import path from 'path'
import normalizePath from 'normalize-path'

export default function getMarkdownMeta (filePath) {
  return readPkgUp({cwd: filePath})
    .then(result => {
      const pkg = result.pkg

      if (!pkg) return {}

      return {
        pkg,
        pkgRoot: normalizePath(path.dirname(result.path)),
        repo: pkg.repository && pkg.repository.url && gh(pkg.repository.url),
      }
    })
    .then(opts => Object.assign(opts, {filePath}))
}