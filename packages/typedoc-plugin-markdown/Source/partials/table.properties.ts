import { DeclarationReflection, ReflectionType } from 'typedoc';
import { escapeChars, stripLineBreaks } from '../support/utils';
import { MarkdownThemeRenderContext } from '../theme-context';

export function propertiesTable(
  context: MarkdownThemeRenderContext,
  props: DeclarationReflection[],
) {
  const comments = props.map((param) => !!param.comment?.hasVisibleComponent());
  const hasComments = !comments.every((value) => !value);

  const sources = props.map((param) => !!param.sources?.length);
  const hasSources = !sources.every((value) => !value);

  const headers = ['Name', 'Type'];

  if (hasComments) {
    headers.push('Description');
  }

  if (hasSources) {
    headers.push('Defined in');
  }

  const flattenParams = (current: any) => {
    return current.type?.declaration?.children?.reduce(
      (acc: any, child: any) => {
        const childObj = {
          ...child,
          name: `${current.name}.${child.name}`,
        };

        return parseParams(childObj, acc);
      },
      [],
    );
  };

  const parseParams = (current: any, acc: any) => {
    const shouldFlatten = current.type?.declaration?.children;

    return shouldFlatten
      ? [...acc, current, ...flattenParams(current)]
      : [...acc, current];
  };

  const properties: DeclarationReflection[] = props.reduce(
    (acc: any, current: any) => parseParams(current, acc),
    [],
  );

  const rows = properties.map((property) => {
    const propertyType = getPropertyType(property);

    const row: string[] = [];

    const nameCol: string[] = [];

    const name =
      property.name.match(/[\\`\\|]/g) !== null
        ? escapeChars(getName(context, property))
        : `\`${getName(context, property)}\``;

    nameCol.push(
      `<div class="anchor-with-padding" id="${property.getFriendlyFullName()}"><a href="#${property.getFriendlyFullName()}">${name}</a></div>`,
    );

    row.push(nameCol.join(' '));

    row.push(
      context.partials.someType(propertyType).replace(/(?<!\\)\|/g, '\\|'),
    );

    if (hasComments) {
      const comments = getComments(property);
      if (comments) {
        row.push(
          stripLineBreaks(context.partials.comment(comments)).replace(
            /\|/g,
            '\\|',
          ),
        );
      } else {
        row.push('-');
      }
    }

    if (hasSources) {
      if (property.sources) {
        row.push(
          stripLineBreaks(context.partials.sources(property)).replace(
            /\|/g,
            '\\|',
          ),
        );
      } else {
        row.push('-');
      }
    }

    return `| ${row.join(' | ')} |\n`;
  });

  const output = `\n| ${headers.join(' | ')} |\n| ${headers
    .map(() => ':------')
    .join(' | ')} |\n${rows.join('')}`;

  return output;
}

function getPropertyType(property: any) {
  if (property.getSignature) {
    return property.getSignature.type;
  }
  if (property.setSignature) {
    return property.setSignature.type;
  }
  return property.type ? property.type : property;
}

function getName(
  context: MarkdownThemeRenderContext,
  property: DeclarationReflection,
) {
  const md: string[] = [];
  if (property.flags.isRest) {
    md.push('...');
  }
  if (property.getSignature) {
    md.push(`get ${property.getSignature.name}()`);
  } else if (property.setSignature) {
    md.push(
      `set ${
        property.setSignature.name
      }(${property.setSignature.parameters?.map((parameter) => {
        return parameter.type
          ? `${parameter.name}:${context.partials.someType(
              parameter.type,
              'all',
              false,
            )}`
          : '';
      })})`,
    );
  } else {
    md.push(property.name);
  }
  if (property.flags.isOptional) {
    md.push('?');
  }
  return md.join('');
}

function getComments(property: DeclarationReflection) {
  if (property.type instanceof ReflectionType) {
    if (property.type?.declaration?.signatures) {
      return property.type?.declaration.signatures[0].comment;
    }
  }
  if (property.signatures) {
    return property.signatures[0].comment;
  }
  return property.comment;
}
