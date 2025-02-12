import {
  ArrayType,
  DeclarationReflection,
  ReferenceType,
  ReflectionKind,
  SignatureReflection,
} from 'typedoc';
import { bold, link } from '../support/els';
import { getQuaternaryHeadingLevel } from '../support/helpers';
import { MarkdownThemeRenderContext } from '../theme-context';

import { escapeChars } from '../support/utils';

export function sources(
  context: MarkdownThemeRenderContext,
  reflection: DeclarationReflection | SignatureReflection,
) {
  const md: string[] = [];

  const headingLevel = getQuaternaryHeadingLevel(reflection);

  if (reflection.implementationOf) {
    md.push(
      `${bold('Implementation of:')} ${typeAndParent(
        context,
        reflection.implementationOf,
      )}`,
    );
  }

  if (reflection.inheritedFrom) {
    md.push(
      `${bold('Inherited from:')} ${typeAndParent(
        context,
        reflection.inheritedFrom,
      )}`,
    );
  }

  if (reflection.overwrites) {
    md.push(
      `${bold('Overrides:')} ${typeAndParent(context, reflection.overwrites)}`,
    );
  }

  const reflectionTable: ReflectionKind[] = [
    ReflectionKind.EnumMember,
    // ReflectionKind.Property,
  ];

  if (reflection.sources) {
    const sources: string[] = [];

    if (reflection.sources.length > 1) {
      sources.push(bold('Defined in') + ' \n\n');
    } else if (!reflectionTable.includes(reflection.kind)) {
      sources.push(bold('Defined in:') + ' ');
    }

    reflection.sources.forEach((source) => {
      if (source.url) {
        sources.push(
          link(`${escapeChars(source.fileName)}:${source.line}`, source.url),
        );
      } else {
        sources.push(`${escapeChars(source.fileName)}:${source.line}`);
      }
    });

    if (reflection.sources.length > 1) {
      md.push(sources.join('\n\n'));
    } else {
      md.push(sources.join(''));
    }
  }

  return md.join('\n\n');
}

const typeAndParent = (
  context: MarkdownThemeRenderContext,
  props: ArrayType | ReferenceType,
) => {
  const getUrl = (name: string, url: string) =>
    `[${name}](${context.relativeURL(url)})`;
  if (props) {
    if ('elementType' in props) {
      return typeAndParent(context, props.elementType as any) + '[]';
    } else {
      if (props.reflection) {
        const md: string[] = [];

        if (props.reflection instanceof SignatureReflection) {
          if (props.reflection.parent?.parent?.url) {
            md.push(
              getUrl(
                props.reflection.parent.parent.name,
                props.reflection.parent.parent.url,
              ),
            );

            if (props.reflection.parent.url) {
              md.push(
                getUrl(
                  props.reflection.parent.name,
                  props.reflection.parent.url,
                ),
              );
            }
          }
        } else {
          if (props.reflection.parent?.url) {
            md.push(
              getUrl(props.reflection.parent.name, props.reflection.parent.url),
            );

            if (props.reflection.url) {
              md.push(getUrl(props.reflection.name, props.reflection.url));
            }
          }
        }

        return md.length > 0 ? md.join('.') : props.name;
      } else {
        return escapeChars(props.toString());
      }
    }
  }
  return 'void';
};
